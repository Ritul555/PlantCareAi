"""
PlantCare AI — Sensors API Routes (Placeholder)

Will be fully implemented in Step 9 (ESP32 Sensor Integration).

Endpoints:
    POST /sensor/data       — Ingest sensor reading from ESP32
    GET  /plants/{id}/sensor-data — Get sensor readings for a plant
    POST /sensor/devices    — Register a sensor device
    GET  /sensor/devices    — List user's sensor devices
"""

from fastapi import APIRouter, Depends, HTTPException, status
from app.models.user import User
from app.auth.jwt_handler import get_current_user

router = APIRouter(prefix="/sensor", tags=["Sensors"])


@router.post(
    "/data",
    summary="Ingest sensor data from ESP32",
    status_code=status.HTTP_501_NOT_IMPLEMENTED,
)
def ingest_sensor_data():
    """
    Receive sensor data from an ESP32 device.

    🚧 This endpoint will be implemented in Step 9 (IoT Integration).
    """
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Sensor data ingestion will be available in Phase 3 (IoT Integration).",
    )


@router.post(
    "/devices",
    summary="Register a sensor device",
    status_code=status.HTTP_501_NOT_IMPLEMENTED,
)
def register_device(current_user: User = Depends(get_current_user)):
    """
    Register a new ESP32 sensor device.

    🚧 This endpoint will be implemented in Step 9.
    """
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Device registration will be available in Phase 3.",
    )


@router.get(
    "/devices",
    summary="List sensor devices",
    status_code=status.HTTP_501_NOT_IMPLEMENTED,
)
def list_devices(current_user: User = Depends(get_current_user)):
    """
    List all sensor devices for the current user.

    🚧 This endpoint will be implemented in Step 9.
    """
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Device listing will be available in Phase 3.",
    )
