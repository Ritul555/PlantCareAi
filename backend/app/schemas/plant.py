"""
PlantCare AI — Plant Schemas

Pydantic models for plant CRUD operations and responses.
"""

from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime


# ===========================
# Request Schemas
# ===========================

class PlantCreate(BaseModel):
    """Schema for creating a new plant."""
    name: str = Field(..., min_length=1, max_length=255, description="User-given plant name")
    plant_type: Optional[str] = Field(None, max_length=255, description="Common plant type (e.g., Tomato)")
    scientific_name: Optional[str] = None
    description: Optional[str] = None
    location: Optional[str] = Field(None, description="Specific location (e.g., Kitchen window)")
    category: str = Field("indoor", description="indoor, outdoor, balcony, garden, greenhouse, other")


class PlantUpdate(BaseModel):
    """Schema for updating a plant."""
    name: Optional[str] = Field(None, min_length=1, max_length=255)
    plant_type: Optional[str] = None
    scientific_name: Optional[str] = None
    description: Optional[str] = None
    location: Optional[str] = None
    category: Optional[str] = None
    image_url: Optional[str] = None


# ===========================
# Response Schemas
# ===========================

class PlantResponse(BaseModel):
    """Schema for plant data in API responses."""
    id: int
    user_id: int
    name: str
    plant_type: Optional[str] = None
    scientific_name: Optional[str] = None
    description: Optional[str] = None
    location: Optional[str] = None
    category: str
    image_url: Optional[str] = None
    health_score: Optional[float] = None
    current_status: str
    last_scan_date: Optional[datetime] = None
    last_watered_date: Optional[datetime] = None
    date_planted: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class PlantListResponse(BaseModel):
    """Schema for listing multiple plants."""
    plants: List[PlantResponse]
    total: int


class PlantDashboardStats(BaseModel):
    """Summary statistics for the home dashboard."""
    total_plants: int
    healthy_plants: int
    needs_attention: int
    high_risk: int
    recent_scans: int
    sensors_online: int
