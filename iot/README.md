# PlantCare AI — IoT Sensor Firmware

This directory contains the ESP32 firmware and sensor integration code.

## Structure (Coming in Step 9)

```
iot/
├── esp32/
│   ├── main.ino          # Main Arduino sketch
│   ├── config.h          # Wi-Fi and API configuration
│   ├── sensors.h         # Sensor reading functions
│   └── wifi_manager.h    # Wi-Fi connection management
├── schematics/
│   └── wiring_diagram.md # Wiring instructions
└── README.md
```

## Hardware

| Component | Description | Cost |
|-----------|-------------|------|
| ESP32 DevKit | Microcontroller with Wi-Fi | $3-5 |
| Capacitive Soil Moisture | Soil moisture sensing | $1-2 |
| DHT22 | Temperature + humidity | $2-3 |
| LDR | Light intensity (optional) | $0.50 |

## Status
🚧 Will be implemented in Step 9 (ESP32 Sensor Integration)
