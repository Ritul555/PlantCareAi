"""
PlantCare AI — Plant Model

Stores plant profile information, health status, and metadata.
Each plant belongs to a user and has scans, sensors, recommendations, and history.
"""

from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base
import enum


class PlantCategory(str, enum.Enum):
    """Where the plant is located."""
    INDOOR = "indoor"
    OUTDOOR = "outdoor"
    BALCONY = "balcony"
    GARDEN = "garden"
    GREENHOUSE = "greenhouse"
    OTHER = "other"


class PlantStatus(str, enum.Enum):
    """Current health status of the plant."""
    HEALTHY = "healthy"
    MILD_STRESS = "mild_stress"
    NEEDS_ATTENTION = "needs_attention"
    HIGH_RISK = "high_risk"
    UNKNOWN = "unknown"


class Plant(Base):
    """
    Plant profile model.

    Each plant has a unique ID and belongs to one user.
    Tracks the current health state and links to all related data.

    Relationships:
        - Plant belongs to User
        - Plant has many PlantScans
        - Plant has many SensorDevices
        - Plant has many Recommendations
        - Plant has many HealthHistory entries
    """
    __tablename__ = "plants"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)

    # ---- Plant Identity ----
    name = Column(String(255), nullable=False)  # User-given name (e.g., "My Tomato")
    plant_type = Column(String(255), nullable=True)  # Common name (e.g., "Tomato")
    scientific_name = Column(String(255), nullable=True)  # Scientific name (e.g., "Solanum lycopersicum")
    description = Column(Text, nullable=True)

    # ---- Location & Category ----
    location = Column(String(255), nullable=True)  # Specific location (e.g., "Kitchen window")
    category = Column(String(50), default=PlantCategory.INDOOR.value, nullable=False)

    # ---- Image ----
    image_url = Column(String(512), nullable=True)  # Primary plant photo

    # ---- Current Health State ----
    health_score = Column(Float, nullable=True)  # 0-100 composite health score
    current_status = Column(String(50), default=PlantStatus.UNKNOWN.value, nullable=False)

    # ---- Tracking ----
    last_scan_date = Column(DateTime(timezone=True), nullable=True)
    last_watered_date = Column(DateTime(timezone=True), nullable=True)
    date_planted = Column(DateTime(timezone=True), nullable=True)

    # ---- Timestamps ----
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    # ---- Relationships ----
    owner = relationship("User", back_populates="plants")
    scans = relationship("PlantScan", back_populates="plant", cascade="all, delete-orphan", order_by="PlantScan.created_at.desc()")
    sensor_devices = relationship("SensorDevice", back_populates="plant", cascade="all, delete-orphan")
    recommendations = relationship("Recommendation", back_populates="plant", cascade="all, delete-orphan", order_by="Recommendation.created_at.desc()")
    health_history = relationship("HealthHistory", back_populates="plant", cascade="all, delete-orphan", order_by="HealthHistory.recorded_at.desc()")

    def __repr__(self):
        return f"<Plant(id={self.id}, name='{self.name}', type='{self.plant_type}', status='{self.current_status}')>"
