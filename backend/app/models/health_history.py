"""
PlantCare AI — Health History Model

Stores a point-in-time snapshot of a plant's health metrics.
Used to build health trend charts and track improvement/decline.
"""

from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base


class HealthHistory(Base):
    """
    Historical health data point for a plant.

    Created after every scan and periodically from sensor readings.
    Enables health trend visualization (charts over time).

    Relationships:
        - HealthHistory belongs to Plant
    """
    __tablename__ = "health_history"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    plant_id = Column(Integer, ForeignKey("plants.id", ondelete="CASCADE"), nullable=False, index=True)
    scan_id = Column(Integer, ForeignKey("plant_scans.id", ondelete="SET NULL"), nullable=True)

    # ---- Health Metrics ----
    health_score = Column(Float, nullable=True)         # 0-100 composite score
    status = Column(String(50), nullable=True)          # healthy, mild_stress, needs_attention, high_risk

    # ---- Sensor Data at This Point ----
    soil_moisture = Column(Float, nullable=True)        # Percentage
    temperature = Column(Float, nullable=True)          # Celsius
    humidity = Column(Float, nullable=True)             # Percentage
    light_intensity = Column(Float, nullable=True)      # Lux

    # ---- Source ----
    source = Column(String(50), default="scan", nullable=False)
    # Values: "scan" (from AI analysis), "sensor" (periodic sensor snapshot),
    #         "combined" (both scan + sensor data available)

    # ---- Detected Issues at This Point ----
    detected_issue = Column(String(255), nullable=True)

    # ---- Timestamps ----
    recorded_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False, index=True)

    # ---- Relationships ----
    plant = relationship("Plant", back_populates="health_history")

    def __repr__(self):
        return f"<HealthHistory(id={self.id}, plant_id={self.plant_id}, score={self.health_score}, date={self.recorded_at})>"
