"""
PlantCare AI — Weather API Routes (Placeholder)

Will be fully implemented in Step 11 (Weather Integration).
"""

from fastapi import APIRouter, Depends, HTTPException, status
from app.models.user import User
from app.auth.jwt_handler import get_current_user

router = APIRouter(prefix="/weather", tags=["Weather"])


@router.get(
    "",
    summary="Get current weather",
    status_code=status.HTTP_501_NOT_IMPLEMENTED,
)
def get_weather(current_user: User = Depends(get_current_user)):
    """
    Get current weather data for the user's location.

    🚧 This endpoint will be implemented in Phase 4 (Weather Integration).
    """
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Weather integration will be available in Phase 4.",
    )
