"""
PlantCare AI — Authentication API Routes

Endpoints:
    POST /auth/register  — Create new user account
    POST /auth/login     — Login and receive JWT token
    GET  /auth/me        — Get current user profile
    PUT  /auth/me        — Update current user profile
    POST /auth/forgot-password — Request password reset
"""

from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.schemas.user import (
    UserRegister,
    UserLogin,
    UserUpdate,
    UserResponse,
    TokenResponse,
    ForgotPassword,
    MessageResponse,
)
from app.auth.password import hash_password, verify_password
from app.auth.jwt_handler import create_access_token, get_current_user

router = APIRouter(prefix="/auth", tags=["Authentication"])


# ===========================
# POST /auth/register
# ===========================
@router.post(
    "/register",
    response_model=TokenResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Register a new user",
)
def register(user_data: UserRegister, db: Session = Depends(get_db)):
    """
    Create a new user account.

    - Validates email uniqueness
    - Hashes password with bcrypt
    - Returns JWT token for immediate login
    """
    # Check if email already exists
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A user with this email already exists",
        )

    # Create new user
    new_user = User(
        email=user_data.email,
        password_hash=hash_password(user_data.password),
        full_name=user_data.full_name,
        phone=user_data.phone,
        city=user_data.city,
        country=user_data.country,
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Create JWT token
    access_token = create_access_token(data={"sub": str(new_user.id)})

    return TokenResponse(
        access_token=access_token,
        user=UserResponse.model_validate(new_user),
    )


# ===========================
# POST /auth/login
# ===========================
@router.post(
    "/login",
    response_model=TokenResponse,
    summary="Login with email and password",
)
def login(credentials: UserLogin, db: Session = Depends(get_db)):
    """
    Authenticate a user and return a JWT token.

    - Verifies email exists
    - Verifies password against bcrypt hash
    - Updates last_login timestamp
    - Returns JWT token
    """
    # Find user by email
    user = db.query(User).filter(User.email == credentials.email).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    # Verify password
    if not verify_password(credentials.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    # Check if account is active
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is deactivated",
        )

    # Update last login
    user.last_login = datetime.now(timezone.utc)
    db.commit()
    db.refresh(user)

    # Create JWT token
    access_token = create_access_token(data={"sub": str(user.id)})

    return TokenResponse(
        access_token=access_token,
        user=UserResponse.model_validate(user),
    )


# ===========================
# GET /auth/me
# ===========================
@router.get(
    "/me",
    response_model=UserResponse,
    summary="Get current user profile",
)
def get_profile(current_user: User = Depends(get_current_user)):
    """Get the authenticated user's profile information."""
    return UserResponse.model_validate(current_user)


# ===========================
# PUT /auth/me
# ===========================
@router.put(
    "/me",
    response_model=UserResponse,
    summary="Update current user profile",
)
def update_profile(
    update_data: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Update the authenticated user's profile."""
    update_dict = update_data.model_dump(exclude_unset=True)

    for field, value in update_dict.items():
        setattr(current_user, field, value)

    db.commit()
    db.refresh(current_user)

    return UserResponse.model_validate(current_user)


# ===========================
# POST /auth/forgot-password
# ===========================
@router.post(
    "/forgot-password",
    response_model=MessageResponse,
    summary="Request password reset",
)
def forgot_password(data: ForgotPassword, db: Session = Depends(get_db)):
    """
    Request a password reset.

    NOTE: In MVP, this just confirms the email exists.
    In production, this would send a reset email with a token.
    """
    user = db.query(User).filter(User.email == data.email).first()

    # Always return success to prevent email enumeration
    return MessageResponse(
        message="If an account with this email exists, a password reset link has been sent.",
        success=True,
    )
