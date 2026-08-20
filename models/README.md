# PlantCare AI — Trained Models

This directory stores trained AI model files (.pth, .pt, .onnx).

## Expected Models

| File | Module | Architecture |
|------|--------|-------------|
| `plant_id_mobilenet_v1.pth` | Plant Identification | MobileNetV2 |
| `health_classifier_v1.pth` | Health Classification | MobileNetV2 |
| `disease_detector_v1.pth` | Disease Detection | EfficientNet-B0 |

## Notes

- Model files are excluded from Git (see .gitignore)
- Download or train models before running AI inference
- See `ai/` directory for training scripts

## Status
🚧 Models will be trained in Step 6
