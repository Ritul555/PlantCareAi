"""
PlantCare AI — Notifications API Routes (Placeholder)

Will be fully implemented in Step 12 (Notifications).
"""

from fastapi import APIRouter, Depends, HTTPException, status
from app.models.user import User
from app.auth.jwt_handler import get_current_user

router = APIRouter(prefix="/notifications", tags=["Notifications"])


@router.get(
    "",
    summary="List notifications",
    status_code=status.HTTP_501_NOT_IMPLEMENTED,
)
def list_notifications(current_user: User = Depends(get_current_user)):
    """
    Get all notifications for the current user.

    🚧 This endpoint will be implemented in Step 12.
    """
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Notifications will be available in Phase 2.",
    )
