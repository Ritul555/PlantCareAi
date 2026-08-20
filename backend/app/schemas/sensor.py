"""
PlantCare AI — Sensor Schemas

Pydantic models for sensor devices, readings, and data ingestion.
"""

from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime


# ===========================
# Request Schemas
# ===========================

class SensorDataIngest(BaseModel):
    """
    Schema for incoming sensor data from ESP32.

    The ESP32 POSTs this to /sensor/data at regular intervals.
    """
    device_id: int
    plant_id: int
    soil_moisture: Optional[float] = Field(None, ge=0, le=100, description="Soil moisture percentage")
    temperature: Optional[float] = Field(None, ge=-40, le=80, description="Temperature in Celsius")
    humidity: Optional[float] = Field(None, ge=0, le=100, description="Humidity percentage")
    light_intensity: Optional[float] = Field(None, ge=0, description="Light intensity in Lux")
    battery_level: Optional[float] = Field(None, ge=0, le=100, description="Battery level percentage")
    reading_timestamp: datetime


class SensorDeviceCreate(BaseModel):
    """Schema for registering a new sensor device."""
    plant_id: int
    device_name: str = Field(..., min_length=1, max_length=255)
    device_type: str = "esp32"
    mac_address: Optional[str] = None
    has_soil_moisture: bool = True
    has_temperature: bool = True
    has_humidity: bool = True
    has_light: bool = False


# ===========================
# Response Schemas
# ===========================

class SensorReadingResponse(BaseModel):
    """Schema for a single sensor reading."""
    id: int
    device_id: int
    plant_id: int
    soil_moisture: Optional[float] = None
    temperature: Optional[float] = None
    humidity: Optional[float] = None
    light_intensity: Optional[float] = None
    battery_level: Optional[float] = None
    reading_timestamp: datetime
    created_at: datetime

    model_config = {"from_attributes": True}


class SensorDeviceResponse(BaseModel):
    """Schema for sensor device info."""
    id: int
    plant_id: int
    device_name: str
    device_type: str
    mac_address: Optional[str] = None
    is_online: bool
    last_seen: Optional[datetime] = None
    battery_level: Optional[float] = None
    has_soil_moisture: bool
    has_temperature: bool
    has_humidity: bool
    has_light: bool
    created_at: datetime

    model_config = {"from_attributes": True}


class SensorReadingListResponse(BaseModel):
    """Schema for listing multiple sensor readings."""
    readings: List[SensorReadingResponse]
    total: int


class LatestSensorData(BaseModel):
    """Schema for the latest sensor readings of a plant."""
    soil_moisture: Optional[float] = None
    temperature: Optional[float] = None
    humidity: Optional[float] = None
    light_intensity: Optional[float] = None
    last_updated: Optional[datetime] = None
    device_online: bool = False
