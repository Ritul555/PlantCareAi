"""
PlantCare AI — Recommendation Schemas

Pydantic models for care recommendation responses.
"""

from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class RecommendationResponse(BaseModel):
    """Schema for care recommendation in API responses."""
    id: int
    plant_id: int
    scan_id: Optional[int] = None

    # Recommendations
    watering_level: Optional[str] = None
    watering_explanation: Optional[str] = None
    light_advice: Optional[str] = None
    temp_humidity_advice: Optional[str] = None
    care_instructions: Optional[str] = None
    problem_explanation: Optional[str] = None
    suggested_actions: Optional[List[str]] = None
    next_scan_suggestion: Optional[str] = None
    summary: Optional[str] = None

    # Metadata
    confidence: Optional[float] = None
    data_sources: Optional[List[str]] = None
    created_at: datetime

    model_config = {"from_attributes": True}
