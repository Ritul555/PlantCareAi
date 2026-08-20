"""
PlantCare AI — Sensor Models

SensorDevice: Represents a physical ESP32 sensor hub paired with a plant.
SensorReading: Stores timestamped readings from sensors.
"""

from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base


class SensorDevice(Base):
    """
    IoT sensor device (ESP32) paired with a plant.

    Each device can have multiple sensors (soil moisture, temp, humidity, light).
    Readings are stored in the SensorReading table.

    Relationships:
        - SensorDevice belongs to Plant
        - SensorDevice has many SensorReadings
    """
    __tablename__ = "sensor_devices"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    plant_id = Column(Integer, ForeignKey("plants.id", ondelete="CASCADE"), nullable=False, index=True)

    # ---- Device Info ----
    device_name = Column(String(255), nullable=False)  # User-given name (e.g., "Kitchen Sensor")
    device_type = Column(String(100), default="esp32", nullable=False)
    mac_address = Column(String(17), nullable=True, unique=True)  # e.g., "AA:BB:CC:DD:EE:FF"
    firmware_version = Column(String(50), nullable=True)

    # ---- Status ----
    is_online = Column(Boolean, default=False, nullable=False)
    last_seen = Column(DateTime(timezone=True), nullable=True)
    battery_level = Column(Float, nullable=True)  # 0-100 percentage

    # ---- Sensor Capabilities ----
    has_soil_moisture = Column(Boolean, default=True, nullable=False)
    has_temperature = Column(Boolean, default=True, nullable=False)
    has_humidity = Column(Boolean, default=True, nullable=False)
    has_light = Column(Boolean, default=False, nullable=False)

    # ---- Timestamps ----
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    # ---- Relationships ----
    plant = relationship("Plant", back_populates="sensor_devices")
    readings = relationship("SensorReading", back_populates="device", cascade="all, delete-orphan", order_by="SensorReading.reading_timestamp.desc()")

    def __repr__(self):
        return f"<SensorDevice(id={self.id}, name='{self.device_name}', plant_id={self.plant_id}, online={self.is_online})>"


class SensorReading(Base):
    """
    Individual sensor reading from an IoT device.

    Stored with a timestamp. The reading_timestamp comes from the device;
    created_at is when the server received it.

    Relationships:
        - SensorReading belongs to SensorDevice
    """
    __tablename__ = "sensor_readings"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    device_id = Column(Integer, ForeignKey("sensor_devices.id", ondelete="CASCADE"), nullable=False, index=True)
    plant_id = Column(Integer, ForeignKey("plants.id", ondelete="CASCADE"), nullable=False, index=True)

    # ---- Readings ----
    soil_moisture = Column(Float, nullable=True)       # Percentage (0-100) or raw ADC value
    temperature = Column(Float, nullable=True)          # Celsius
    humidity = Column(Float, nullable=True)             # Percentage (0-100)
    light_intensity = Column(Float, nullable=True)      # Lux or raw ADC value

    # ---- Device Health ----
    battery_level = Column(Float, nullable=True)        # Percentage (0-100)

    # ---- Timestamps ----
    reading_timestamp = Column(DateTime(timezone=True), nullable=False)  # When sensor took the reading
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)  # When server received it

    # ---- Relationships ----
    device = relationship("SensorDevice", back_populates="readings")

    def __repr__(self):
        return (
            f"<SensorReading(id={self.id}, device_id={self.device_id}, "
            f"moisture={self.soil_moisture}, temp={self.temperature}, "
            f"humidity={self.humidity})>"
        )
