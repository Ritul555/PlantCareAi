"""
PlantCare AI — Database Configuration

SQLAlchemy engine, session, and base model setup.
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from app.config import settings


# ===========================
# Database Engine
# ===========================
engine_kwargs = {
    "echo": settings.DEBUG,  # Log SQL queries in debug mode
}

# PostgreSQL-specific settings (not applicable to SQLite)
if not settings.DATABASE_URL.startswith("sqlite"):
    engine_kwargs.update({
        "pool_pre_ping": True,
        "pool_size": 10,
        "max_overflow": 20,
    })
else:
    # SQLite needs this for multi-threaded access
    engine_kwargs["connect_args"] = {"check_same_thread": False}

engine = create_engine(settings.DATABASE_URL, **engine_kwargs)

# ===========================
# Session Factory
# ===========================
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)


# ===========================
# Base Model Class
# ===========================
class Base(DeclarativeBase):
    """Base class for all SQLAlchemy models."""
    pass


# ===========================
# Dependency: Get DB Session
# ===========================
def get_db():
    """
    FastAPI dependency that provides a database session.
    Automatically closes the session after the request.

    Usage:
        @router.get("/items")
        def get_items(db: Session = Depends(get_db)):
            ...
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ===========================
# Create All Tables
# ===========================
def create_tables():
    """
    Create all database tables.
    Called on application startup if tables don't exist.
    In production, use Alembic migrations instead.
    """
    Base.metadata.create_all(bind=engine)
