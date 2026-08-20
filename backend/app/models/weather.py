"""
PlantCare AI — Weather Data Model

Stores cached weather data fetched from external weather APIs.
Used to provide weather-aware care recommendations.
"""

from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, JSON
from sqlalchemy.sql import func
from app.database import Base


class WeatherData(Base):
    """
    Cached weather data for a user's location.

    Fetched periodically from OpenWeatherMap or similar API.
    Used to factor weather conditions into plant care recommendations.
    """
    __tablename__ = "weather_data"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)

    # ---- Current Weather ----
    temperature = Column(Float, nullable=True)          # Celsius
    feels_like = Column(Float, nullable=True)           # Celsius
    humidity = Column(Float, nullable=True)             # Percentage
    condition = Column(String(100), nullable=True)      # e.g., "Clear", "Cloudy", "Rain"
    condition_description = Column(String(255), nullable=True)  # e.g., "light rain"
    wind_speed = Column(Float, nullable=True)           # m/s
    rain_probability = Column(Float, nullable=True)     # 0.0 - 1.0

    # ---- Forecast Data (JSON) ----
    forecast_data = Column(JSON, nullable=True)
    # Example: [
    #   {"date": "2024-08-17", "temp_high": 32, "temp_low": 24, "condition": "Sunny", "rain_prob": 0.1},
    #   {"date": "2024-08-18", "temp_high": 30, "temp_low": 22, "condition": "Cloudy", "rain_prob": 0.4}
    # ]

    # ---- Location ----
    city = Column(String(100), nullable=True)
    country = Column(String(100), nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)

    # ---- Timestamps ----
    fetched_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    def __repr__(self):
        return f"<WeatherData(id={self.id}, city='{self.city}', temp={self.temperature}, condition='{self.condition}')>"
