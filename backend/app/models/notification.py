"""
PlantCare AI — Notification Model

Stores in-app notifications for users.
Notifications are triggered by health alerts, sensor events, and reminders.
"""

from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base


class Notification(Base):
    """
    User notification.

    Types:
        - health_alert: Plant needs attention
        - sensor_alert: Soil moisture too low/high, sensor disconnected
        - disease_alert: Possible disease detected
        - reminder: Re-scan reminder, watering reminder
        - info: General information

    Relationships:
        - Notification belongs to User
    """
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    plant_id = Column(Integer, ForeignKey("plants.id", ondelete="SET NULL"), nullable=True, index=True)

    # ---- Content ----
    title = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    notification_type = Column(String(50), nullable=False, default="info")
    # Types: "health_alert", "sensor_alert", "disease_alert",
    #        "reminder", "weather_alert", "info"

    # ---- Status ----
    is_read = Column(Boolean, default=False, nullable=False)

    # ---- Action ----
    action_url = Column(String(512), nullable=True)  # Deep link or route to navigate to
    # Example: "/plants/42" or "/plants/42/scan"

    # ---- Priority ----
    priority = Column(String(20), default="normal", nullable=False)
    # Values: "low", "normal", "high", "urgent"

    # ---- Icon/Emoji ----
    icon = Column(String(10), nullable=True, default="🌱")

    # ---- Timestamps ----
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    read_at = Column(DateTime(timezone=True), nullable=True)

    # ---- Relationships ----
    user = relationship("User", back_populates="notifications")

    def __repr__(self):
        return f"<Notification(id={self.id}, type='{self.notification_type}', read={self.is_read})>"
