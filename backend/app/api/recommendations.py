"""
PlantCare AI — Recommendations API Routes (Placeholder)

Will be fully implemented in Step 8 (Recommendation Engine).
"""

from fastapi import APIRouter, Depends, HTTPException, status
from app.models.user import User
from app.auth.jwt_handler import get_current_user

router = APIRouter(prefix="/recommendations", tags=["Recommendations"])


@router.get(
    "/{plant_id}",
    summary="Get recommendations for a plant",
    status_code=status.HTTP_501_NOT_IMPLEMENTED,
)
def get_recommendations(plant_id: int, current_user: User = Depends(get_current_user)):
    """
    Get personalized care recommendations for a specific plant.

    🚧 This endpoint will be implemented in Step 8 (Recommendation Engine).
    """
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Recommendations will be available after AI model integration.",
    )
