"""
PlantCare AI — Database Models Package

All SQLAlchemy ORM models are imported here for easy access.
"""

from app.models.user import User
from app.models.plant import Plant
from app.models.scan import PlantScan
from app.models.sensor import SensorDevice, SensorReading
from app.models.recommendation import Recommendation
from app.models.notification import Notification
from app.models.health_history import HealthHistory
from app.models.weather import WeatherData

__all__ = [
    "User",
    "Plant",
    "PlantScan",
    "SensorDevice",
    "SensorReading",
    "Recommendation",
    "Notification",
    "HealthHistory",
    "WeatherData",
]
