"""
PlantCare AI — Scans API Routes

Endpoints:
    POST /scan              — Upload image + run Gemini AI analysis (standalone scan)
    POST /plants/{id}/scan  — Upload image + run AI analysis for a specific plant
    GET  /plants/{id}/scans — Get scan history for a plant
    GET  /scans/{scan_id}   — Get specific scan result
"""

import os
import uuid
import logging
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
from typing import Optional

from app.database import get_db
from app.models.user import User
from app.models.plant import Plant
from app.models.scan import PlantScan
from app.auth.jwt_handler import get_current_user
from app.config import settings
from app.services.ai_service import analyze_plant_image

logger = logging.getLogger(__name__)

router = APIRouter(tags=["Scans"])

ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"]


# ===========================
# POST /scan  (standalone — no plant_id required)
# ===========================
@router.post(
    "/scan",
    summary="Scan a plant image with AI (no plant required)",
    status_code=status.HTTP_200_OK,
)
async def quick_scan(
    image: UploadFile = File(..., description="Plant image to analyze (JPEG, PNG, or WebP)"),
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_user),
):
    """
    Upload a plant image and receive an instant AI health analysis.

    - Accepts JPEG, PNG, or WebP images up to 10MB
    - Returns health score, plant identification, detected issues, and care recommendations
    - Uses Google Gemini Vision API for analysis
    - Does NOT require a plant to be pre-registered in your collection
    """
    # ---- Validate image type ----
    if image.content_type not in ALLOWED_IMAGE_TYPES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid image type '{image.content_type}'. Allowed: JPEG, PNG, WebP",
        )

    # ---- Read and validate file size ----
    content = await image.read()
    max_bytes = settings.MAX_UPLOAD_SIZE_MB * 1024 * 1024
    if len(content) > max_bytes:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Image too large. Maximum size: {settings.MAX_UPLOAD_SIZE_MB}MB",
        )
    if len(content) < 100:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Image file appears to be empty or corrupted",
        )

    # ---- Save uploaded image ----
    upload_dir = os.path.join(settings.UPLOAD_DIR, "scans")
    os.makedirs(upload_dir, exist_ok=True)

    file_ext = os.path.splitext(image.filename or "image.jpg")[1] or ".jpg"
    filename = f"scan_{uuid.uuid4().hex}{file_ext}"
    filepath = os.path.join(upload_dir, filename)

    with open(filepath, "wb") as f:
        f.write(content)
    logger.info(f"Saved scan image: {filepath}")

    # ---- Run AI Analysis ----
    logger.info("Running Gemini plant analysis...")
    try:
        analysis = analyze_plant_image(content, image.content_type or "image/jpeg")
    except Exception as e:
        logger.error(f"AI analysis error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="AI analysis failed. Please try again.",
        )

    # ---- Save scan to DB (if user is authenticated) ----
    scan_id = None
    if current_user:
        try:
            scan = PlantScan(
                plant_id=None,  # Standalone scan — not linked to a plant
                image_path=filepath,
                scan_type="quick_scan",
                health_score=float(analysis["health_score"]),
                health_status=analysis["health_status"],
                identified_plant_type=analysis["plant_name"],
                identification_confidence=analysis.get("identification_confidence"),
                detected_disease=analysis.get("detected_disease"),
                disease_confidence=analysis.get("disease_confidence"),
                visual_analysis={
                    "water_requirement": analysis["water_requirement"],
                    "light_requirement": analysis["light_requirement"],
                    "air_recommendation": analysis.get("air_recommendation"),
                },
                detected_issues=analysis["detected_issues"],
                ai_explanation=analysis["ai_explanation"],
                overall_confidence=analysis.get("identification_confidence"),
            )
            db.add(scan)
            db.commit()
            db.refresh(scan)
            scan_id = scan.id
        except Exception as e:
            logger.warning(f"Could not save scan to DB: {e}")
            db.rollback()

    # ---- Return structured result ----
    return {
        "scan_id": scan_id,
        "plant_name": analysis["plant_name"],
        "scientific_name": analysis.get("scientific_name"),
        "health_score": analysis["health_score"],
        "health_status": analysis["health_status"],
        "detected_issues": analysis["detected_issues"],
        "detected_disease": analysis.get("detected_disease"),
        "water_requirement": analysis["water_requirement"],
        "light_requirement": analysis["light_requirement"],
        "air_recommendation": analysis.get("air_recommendation"),
        "ai_explanation": analysis["ai_explanation"],
        "care_recommendations": analysis["care_recommendations"],
        "image_path": filepath,
        "scanned_at": datetime.now(timezone.utc).isoformat(),
    }


# ===========================
# POST /plants/{plant_id}/scan  (linked to a specific plant)
# ===========================
@router.post(
    "/plants/{plant_id}/scan",
    summary="Scan a plant (AI analysis)",
    status_code=status.HTTP_200_OK,
)
async def scan_plant(
    plant_id: int,
    image: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Upload an image and run AI analysis for a specific registered plant.
    Updates the plant's health status after analysis.
    """
    # ---- Verify plant belongs to user ----
    plant = (
        db.query(Plant)
        .filter(Plant.id == plant_id, Plant.user_id == current_user.id)
        .first()
    )
    if not plant:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Plant not found",
        )

    # ---- Validate image ----
    if image.content_type not in ALLOWED_IMAGE_TYPES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid image type. Allowed: JPEG, PNG, WebP",
        )

    content = await image.read()
    max_bytes = settings.MAX_UPLOAD_SIZE_MB * 1024 * 1024
    if len(content) > max_bytes:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Image too large. Maximum: {settings.MAX_UPLOAD_SIZE_MB}MB",
        )

    # ---- Save image ----
    upload_dir = os.path.join(settings.UPLOAD_DIR, "scans", str(current_user.id))
    os.makedirs(upload_dir, exist_ok=True)

    file_ext = os.path.splitext(image.filename or "image.jpg")[1] or ".jpg"
    filename = f"plant_{plant_id}_scan_{uuid.uuid4().hex[:8]}{file_ext}"
    filepath = os.path.join(upload_dir, filename)

    with open(filepath, "wb") as f:
        f.write(content)

    # ---- Run AI Analysis ----
    analysis = analyze_plant_image(content, image.content_type or "image/jpeg")

    # ---- Save scan to DB ----
    scan = PlantScan(
        plant_id=plant_id,
        image_path=filepath,
        scan_type="manual",
        health_score=float(analysis["health_score"]),
        health_status=analysis["health_status"],
        identified_plant_type=analysis["plant_name"],
        identification_confidence=analysis.get("identification_confidence"),
        detected_disease=analysis.get("detected_disease"),
        disease_confidence=analysis.get("disease_confidence"),
        visual_analysis={
            "water_requirement": analysis["water_requirement"],
            "light_requirement": analysis["light_requirement"],
        },
        detected_issues=analysis["detected_issues"],
        ai_explanation=analysis["ai_explanation"],
        overall_confidence=analysis.get("identification_confidence"),
    )
    db.add(scan)

    # ---- Update plant health status ----
    plant.current_status = analysis["health_status"]
    db.commit()
    db.refresh(scan)

    return {
        "scan_id": scan.id,
        "plant_id": plant_id,
        "plant_name": analysis["plant_name"],
        "scientific_name": analysis.get("scientific_name"),
        "health_score": analysis["health_score"],
        "health_status": analysis["health_status"],
        "detected_issues": analysis["detected_issues"],
        "detected_disease": analysis.get("detected_disease"),
        "water_requirement": analysis["water_requirement"],
        "light_requirement": analysis["light_requirement"],
        "air_recommendation": analysis.get("air_recommendation"),
        "ai_explanation": analysis["ai_explanation"],
        "care_recommendations": analysis["care_recommendations"],
        "scanned_at": scan.created_at.isoformat(),
    }


# ===========================
# GET /plants/{plant_id}/scans  (scan history)
# ===========================
@router.get(
    "/plants/{plant_id}/scans",
    summary="Get scan history for a plant",
)
def get_scan_history(
    plant_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Get the AI scan history for a specific plant, newest first."""
    plant = (
        db.query(Plant)
        .filter(Plant.id == plant_id, Plant.user_id == current_user.id)
        .first()
    )
    if not plant:
        raise HTTPException(status_code=404, detail="Plant not found")

    scans = (
        db.query(PlantScan)
        .filter(PlantScan.plant_id == plant_id)
        .order_by(PlantScan.created_at.desc())
        .all()
    )

    return {
        "plant_id": plant_id,
        "total_scans": len(scans),
        "scans": [
            {
                "scan_id": s.id,
                "health_score": s.health_score,
                "health_status": s.health_status,
                "plant_name": s.identified_plant_type,
                "detected_disease": s.detected_disease,
                "detected_issues": s.detected_issues or [],
                "ai_explanation": s.ai_explanation,
                "scanned_at": s.created_at.isoformat(),
            }
            for s in scans
        ],
    }
