"""
PlantCare AI — Main FastAPI Application

This is the entry point for the backend server.
Run with: uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
"""

import os
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.config import settings, get_allowed_origins
from app.database import create_tables

# Import API routers
from app.api.auth import router as auth_router
from app.api.plants import router as plants_router
from app.api.scans import router as scans_router
from app.api.sensors import router as sensors_router
from app.api.recommendations import router as recommendations_router
from app.api.notifications import router as notifications_router
from app.api.weather import router as weather_router
from app.api.analytics import router as analytics_router


# ===========================
# Application Lifespan
# ===========================
@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application startup and shutdown events.

    Startup:
        - Create database tables (development only)
        - Create upload directories
        - Load AI models (future)

    Shutdown:
        - Clean up resources
    """
    # ---- Startup ----
    print(f"\n[PlantCare] Starting {settings.APP_NAME} v{settings.APP_VERSION}")
    print(f"   Debug mode: {settings.DEBUG}")

    # Create database tables (use Alembic migrations in production)
    if settings.DEBUG:
        print("   [DB] Creating database tables...")
        create_tables()
        print("   [OK] Database tables ready")

    # Create upload directory
    os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
    print(f"   [DIR] Upload directory: {settings.UPLOAD_DIR}")

    print(f"\n   [SERVER] Ready at http://{settings.HOST}:{settings.PORT}")
    print(f"   [DOCS] API docs at http://{settings.HOST}:{settings.PORT}/docs")
    print(f"   {'='*50}\n")

    yield

    # ---- Shutdown ----
    print(f"\n[PlantCare] Shutting down {settings.APP_NAME}...")


# ===========================
# Create FastAPI App
# ===========================
app = FastAPI(
    title=settings.APP_NAME,
    description=(
        "AI-Powered Plant Digital Health Assistant\n\n"
        "PlantCare AI combines smartphone camera vision, IoT sensors, "
        "and intelligent recommendations to help you care for your plants.\n\n"
        "**Core Pipeline:** SCAN > SENSE > ANALYZE > RECOMMEND > TRACK > PREDICT\n\n"
        "### Features\n"
        "- Plant identification from photos\n"
        "- AI health analysis and disease detection\n"
        "- IoT sensor integration (soil moisture, temp, humidity)\n"
        "- Personalized care recommendations\n"
        "- Health history and trend tracking\n"
        "- Weather-aware guidance\n"
        "- Smart notifications\n"
    ),
    version=settings.APP_VERSION,
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)


# ===========================
# CORS Middleware
# ===========================
app.add_middleware(
    CORSMiddleware,
    allow_origins=get_allowed_origins(),
    allow_origin_regex=r"http://localhost:\d+",  # Allow ALL localhost ports (Flutter Chrome)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ===========================
# Register API Routers
# ===========================
app.include_router(auth_router)
app.include_router(plants_router)
app.include_router(scans_router)
app.include_router(sensors_router)
app.include_router(recommendations_router)
app.include_router(notifications_router)
app.include_router(weather_router)
app.include_router(analytics_router)


# ===========================
# Health Check Endpoint
# ===========================
@app.get(
    "/",
    tags=["Health"],
    summary="Health check",
)
def health_check():
    """
    Root endpoint — health check.

    Returns basic application info and status.
    """
    return {
        "status": "healthy",
        "app": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "message": "PlantCare AI is running!",
        "docs": "/docs",
    }


@app.get(
    "/health",
    tags=["Health"],
    summary="Detailed health check",
)
def detailed_health_check():
    """
    Detailed health check with component status.
    """
    return {
        "status": "healthy",
        "app": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "components": {
            "api": "operational",
            "database": "operational",
            "ai_models": "not_loaded",  # Will be updated in Step 6
            "sensors": "not_configured",  # Will be updated in Step 9
            "weather": "not_configured",  # Will be updated in Phase 4
        },
        "endpoints": {
            "auth": "[READY]",
            "plants": "[READY]",
            "scans": "[PLANNED] Phase 1",
            "sensors": "[PLANNED] Phase 3",
            "recommendations": "[PLANNED] Phase 2",
            "notifications": "[PLANNED] Phase 2",
            "weather": "[PLANNED] Phase 4",
            "analytics": "[PLANNED] Phase 4",
        },
    }
