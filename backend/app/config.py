"""
PlantCare AI — Application Configuration

Loads settings from environment variables / .env file.
"""

from pydantic_settings import BaseSettings
from typing import Optional
import os


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    # ---- App ----
    APP_NAME: str = "PlantCare AI"
    APP_VERSION: str = "0.1.0"
    DEBUG: bool = True

    # ---- Server ----
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    ALLOWED_ORIGINS: str = "http://localhost:3000,http://localhost:8080"

    # ---- Database ----
    DATABASE_URL: str = "postgresql://plantcare_user:plantcare_pass@localhost:5432/plantcare_db"

    # ---- Authentication ----
    SECRET_KEY: str = "dev-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440  # 24 hours

    # ---- File Uploads ----
    UPLOAD_DIR: str = "uploads"
    MAX_UPLOAD_SIZE_MB: int = 10

    # ---- AI Models (legacy local model paths) ----
    MODEL_DIR: str = "../models"
    PLANT_ID_MODEL: str = "plant_id_mobilenet_v1.pth"
    HEALTH_MODEL: str = "health_classifier_v1.pth"
    DISEASE_MODEL: str = "disease_detector_v1.pth"

    # ---- Gemini Vision API ----
    GEMINI_API_KEY: Optional[str] = None
    GEMINI_MODEL: str = "gemini-1.5-flash"

    # ---- Weather API (Phase 4) ----
    WEATHER_API_KEY: Optional[str] = None
    WEATHER_API_URL: str = "https://api.openweathermap.org/data/2.5"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True
        extra = "ignore"  # Ignore extra env vars like POSTGRES_USER, POSTGRES_DB


# Global settings instance
settings = Settings()


def get_allowed_origins() -> list[str]:
    """Parse comma-separated ALLOWED_ORIGINS into a list (non-wildcard entries only).

    Wildcard entries like 'http://localhost:*' are skipped here.
    Localhost CORS is handled via allow_origin_regex in main.py.
    """
    origins = []
    for origin in settings.ALLOWED_ORIGINS.split(","):
        origin = origin.strip()
        # Skip wildcard entries — handled via regex in main.py
        if "*" not in origin:
            origins.append(origin)
    return origins
