"""
PlantCare AI — Recommendation Model

Stores personalized care recommendations generated for each plant.
Recommendations are based on AI analysis, sensor data, and plant type.
"""

from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text, JSON
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base


class Recommendation(Base):
    """
    Care recommendation for a plant.

    Generated after a scan or periodically based on sensor data.
    Combines image analysis, sensor readings, plant type, and weather
    to produce actionable care guidance.

    Relationships:
        - Recommendation belongs to Plant
    """
    __tablename__ = "recommendations"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    plant_id = Column(Integer, ForeignKey("plants.id", ondelete="CASCADE"), nullable=False, index=True)
    scan_id = Column(Integer, ForeignKey("plant_scans.id", ondelete="SET NULL"), nullable=True)

    # ---- Watering ----
    watering_level = Column(String(50), nullable=True)
    # Values: "water_now", "water_soon", "no_immediate_watering",
    #         "avoid_watering", "check_soil"

    watering_explanation = Column(Text, nullable=True)
    # Example: "Soil moisture is low and the plant is showing mild visual stress."

    # ---- Light ----
    light_advice = Column(Text, nullable=True)
    # Example: "Move to brighter indirect light."

    # ---- Temperature & Humidity ----
    temp_humidity_advice = Column(Text, nullable=True)
    # Example: "Temperature is suitable. Humidity is slightly low."

    # ---- Care Instructions ----
    care_instructions = Column(Text, nullable=True)
    # Example: "Check soil before watering. Consider adding fertilizer."

    # ---- Problem Explanation ----
    problem_explanation = Column(Text, nullable=True)
    # Example: "Yellowing leaves may indicate overwatering or nutrient deficiency."

    # ---- Suggested Actions ----
    suggested_actions = Column(JSON, nullable=True)
    # Example: ["Water the plant", "Move to brighter spot", "Re-scan in 48 hours"]

    # ---- Next Scan ----
    next_scan_suggestion = Column(String(255), nullable=True)
    # Example: "Re-scan in 48 hours"

    # ---- Overall Summary ----
    summary = Column(Text, nullable=True)
    # One-line summary for the dashboard
    # Example: "Your tomato needs watering soon. Soil moisture is low."

    # ---- Confidence ----
    confidence = Column(Float, nullable=True)  # 0.0 - 1.0

    # ---- Data Sources Used ----
    data_sources = Column(JSON, nullable=True)
    # Example: ["image_analysis", "sensor_data", "plant_profile", "weather"]

    # ---- Timestamps ----
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    # ---- Relationships ----
    plant = relationship("Plant", back_populates="recommendations")

    def __repr__(self):
        return f"<Recommendation(id={self.id}, plant_id={self.plant_id}, watering='{self.watering_level}')>"
