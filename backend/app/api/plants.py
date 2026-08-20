"""
PlantCare AI — Plants API Routes

Endpoints:
    GET    /plants           — List all user's plants
    POST   /plants           — Add a new plant
    GET    /plants/{id}      — Get plant details
    PUT    /plants/{id}      — Update plant info
    DELETE /plants/{id}      — Delete a plant
    GET    /plants/dashboard — Get dashboard statistics
"""

import os
import uuid
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import Optional

from app.database import get_db
from app.models.user import User
from app.models.plant import Plant
from app.schemas.plant import (
    PlantCreate,
    PlantUpdate,
    PlantResponse,
    PlantListResponse,
    PlantDashboardStats,
)
from app.auth.jwt_handler import get_current_user
from app.config import settings

router = APIRouter(prefix="/plants", tags=["Plants"])


# ===========================
# GET /plants/dashboard
# ===========================
@router.get(
    "/dashboard",
    response_model=PlantDashboardStats,
    summary="Get dashboard statistics",
)
def get_dashboard(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Get summary statistics for the home dashboard."""
    plants = db.query(Plant).filter(Plant.user_id == current_user.id).all()

    total = len(plants)
    healthy = sum(1 for p in plants if p.current_status == "healthy")
    needs_attention = sum(1 for p in plants if p.current_status in ("mild_stress", "needs_attention"))
    high_risk = sum(1 for p in plants if p.current_status == "high_risk")

    return PlantDashboardStats(
        total_plants=total,
        healthy_plants=healthy,
        needs_attention=needs_attention,
        high_risk=high_risk,
        recent_scans=0,  # Will be populated when scans are implemented
        sensors_online=0,  # Will be populated when sensors are implemented
    )


# ===========================
# GET /plants
# ===========================
@router.get(
    "",
    response_model=PlantListResponse,
    summary="List all plants",
)
def list_plants(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Get all plants belonging to the authenticated user."""
    plants = (
        db.query(Plant)
        .filter(Plant.user_id == current_user.id)
        .order_by(Plant.created_at.desc())
        .all()
    )

    return PlantListResponse(
        plants=[PlantResponse.model_validate(p) for p in plants],
        total=len(plants),
    )


# ===========================
# POST /plants
# ===========================
@router.post(
    "",
    response_model=PlantResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Add a new plant",
)
def create_plant(
    plant_data: PlantCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Add a new plant to the user's collection.

    The plant starts with status "unknown" until the first scan.
    """
    new_plant = Plant(
        user_id=current_user.id,
        name=plant_data.name,
        plant_type=plant_data.plant_type,
        scientific_name=plant_data.scientific_name,
        description=plant_data.description,
        location=plant_data.location,
        category=plant_data.category,
        current_status="unknown",
    )

    db.add(new_plant)
    db.commit()
    db.refresh(new_plant)

    return PlantResponse.model_validate(new_plant)


# ===========================
# GET /plants/{plant_id}
# ===========================
@router.get(
    "/{plant_id}",
    response_model=PlantResponse,
    summary="Get plant details",
)
def get_plant(
    plant_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Get detailed information about a specific plant."""
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

    return PlantResponse.model_validate(plant)


# ===========================
# PUT /plants/{plant_id}
# ===========================
@router.put(
    "/{plant_id}",
    response_model=PlantResponse,
    summary="Update plant info",
)
def update_plant(
    plant_id: int,
    update_data: PlantUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Update information about a specific plant."""
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

    update_dict = update_data.model_dump(exclude_unset=True)
    for field, value in update_dict.items():
        setattr(plant, field, value)

    db.commit()
    db.refresh(plant)

    return PlantResponse.model_validate(plant)


# ===========================
# DELETE /plants/{plant_id}
# ===========================
@router.delete(
    "/{plant_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete a plant",
)
def delete_plant(
    plant_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Delete a plant and all its associated data.

    This cascades to delete all scans, sensor associations,
    recommendations, and health history for this plant.
    """
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

    db.delete(plant)
    db.commit()


# ===========================
# POST /plants/{plant_id}/image
# ===========================
@router.post(
    "/{plant_id}/image",
    response_model=PlantResponse,
    summary="Upload plant image",
)
async def upload_plant_image(
    plant_id: int,
    image: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Upload or update the primary image for a plant."""
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

    # Validate file type
    allowed_types = ["image/jpeg", "image/png", "image/webp"]
    if image.content_type not in allowed_types:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid image type. Allowed: {', '.join(allowed_types)}",
        )

    # Validate file size
    max_size = settings.MAX_UPLOAD_SIZE_MB * 1024 * 1024  # Convert to bytes
    content = await image.read()
    if len(content) > max_size:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Image too large. Maximum size: {settings.MAX_UPLOAD_SIZE_MB}MB",
        )

    # Save file
    upload_dir = os.path.join(settings.UPLOAD_DIR, "plants", str(current_user.id))
    os.makedirs(upload_dir, exist_ok=True)

    file_ext = os.path.splitext(image.filename)[1] if image.filename else ".jpg"
    filename = f"plant_{plant_id}_{uuid.uuid4().hex[:8]}{file_ext}"
    filepath = os.path.join(upload_dir, filename)

    with open(filepath, "wb") as f:
        f.write(content)

    # Update plant image URL
    plant.image_url = filepath
    db.commit()
    db.refresh(plant)

    return PlantResponse.model_validate(plant)
