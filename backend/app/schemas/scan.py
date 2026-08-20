"""
PlantCare AI — Scan Schemas

Pydantic models for plant scan results and AI analysis responses.
"""

from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime


# ===========================
# Response Schemas
# ===========================

class VisualAnalysis(BaseModel):
    """Structured visual analysis from AI."""
    wilting: bool = False
    yellowing: bool = False
    brown_edges: bool = False
    spots: bool = False
    leaf_damage: bool = False
    overall_appearance: str = "healthy"


class ScanResponse(BaseModel):
    """Schema for scan result in API responses."""
    id: int
    plant_id: int
    image_path: str
    scan_type: str

    # AI Analysis
    health_score: Optional[float] = None
    health_status: Optional[str] = None
    identified_plant_type: Optional[str] = None
    identification_confidence: Optional[float] = None
    detected_disease: Optional[str] = None
    disease_confidence: Optional[float] = None
    visual_analysis: Optional[Dict[str, Any]] = None
    detected_issues: Optional[List[str]] = None
    ai_explanation: Optional[str] = None
    overall_confidence: Optional[float] = None

    created_at: datetime

    model_config = {"from_attributes": True}


class ScanListResponse(BaseModel):
    """Schema for listing multiple scans."""
    scans: List[ScanResponse]
    total: int
