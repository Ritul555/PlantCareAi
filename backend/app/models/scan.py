"""
PlantCare AI — Plant Scan Model

Stores results from each AI image analysis/scan.
Each scan is linked to a specific plant.
"""

from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base


class PlantScan(Base):
    """
    Plant scan / AI analysis result.

    Created each time a user scans a plant (uploads/takes a photo).
    Stores the AI analysis results including health score, detected issues,
    and confidence levels.

    Relationships:
        - PlantScan belongs to Plant
        - PlantScan has one Recommendation (optional)
    """
    __tablename__ = "plant_scans"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    plant_id = Column(Integer, ForeignKey("plants.id", ondelete="CASCADE"), nullable=True, index=True)

    # ---- Image ----
    image_path = Column(String(512), nullable=False)  # Path to uploaded scan image
    scan_type = Column(String(50), default="manual", nullable=False)  # manual, scheduled, auto

    # ---- AI Analysis Results ----
    health_score = Column(Float, nullable=True)  # 0-100
    health_status = Column(String(50), nullable=True)  # healthy, mild_stress, needs_attention, high_risk

    # ---- Plant Identification ----
    identified_plant_type = Column(String(255), nullable=True)
    identification_confidence = Column(Float, nullable=True)  # 0.0 - 1.0

    # ---- Disease Detection ----
    detected_disease = Column(String(255), nullable=True)  # e.g., "leaf_spot", "powdery_mildew"
    disease_confidence = Column(Float, nullable=True)  # 0.0 - 1.0

    # ---- Visual Analysis ----
    # Structured analysis of what the AI observed in the image
    visual_analysis = Column(JSON, nullable=True)
    # Example: {
    #   "wilting": false,
    #   "yellowing": true,
    #   "brown_edges": false,
    #   "spots": true,
    #   "leaf_damage": false,
    #   "overall_appearance": "mild_stress"
    # }

    # ---- Detected Issues (list) ----
    detected_issues = Column(JSON, nullable=True)
    # Example: ["yellowing_leaves", "possible_nutrient_deficiency"]

    # ---- AI Explanation ----
    ai_explanation = Column(Text, nullable=True)
    # Human-readable explanation of the analysis
    # Example: "The plant shows signs of mild stress. Some leaves appear
    #           to be yellowing, which could indicate overwatering or
    #           nutrient deficiency."

    # ---- Confidence ----
    overall_confidence = Column(Float, nullable=True)  # 0.0 - 1.0

    # ---- Timestamps ----
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    # ---- Relationships ----
    plant = relationship("Plant", back_populates="scans")

    def __repr__(self):
        return f"<PlantScan(id={self.id}, plant_id={self.plant_id}, score={self.health_score}, status='{self.health_status}')>"
