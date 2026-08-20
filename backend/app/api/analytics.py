"""
PlantCare AI — Analytics API Routes (Placeholder)

Will be fully implemented in Step 11 (History & Analytics).
"""

from fastapi import APIRouter, Depends, HTTPException, status
from app.models.user import User
from app.auth.jwt_handler import get_current_user

router = APIRouter(prefix="/analytics", tags=["Analytics"])


@router.get(
    "/dashboard",
    summary="Get analytics dashboard data",
    status_code=status.HTTP_501_NOT_IMPLEMENTED,
)
def get_analytics(current_user: User = Depends(get_current_user)):
    """
    Get analytics dashboard data (total scans, health trends, etc.).

    🚧 This endpoint will be implemented in Phase 4.
    """
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Analytics will be available in Phase 4.",
    )
