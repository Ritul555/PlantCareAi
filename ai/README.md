# PlantCare AI — AI/ML Modules

This directory contains the AI/ML pipeline for PlantCare AI.

## Structure (Coming in Step 6)

```
ai/
├── training/          # Model training scripts
│   ├── train_plant_id.py
│   ├── train_health.py
│   └── train_disease.py
├── inference/         # Inference/prediction modules
│   ├── plant_identifier.py
│   ├── health_classifier.py
│   └── disease_detector.py
├── preprocessing/     # Image transforms and data loading
│   ├── image_transforms.py
│   └── data_loader.py
├── models/            # Saved model files (.pth)
├── evaluation/        # Evaluation scripts and metrics
│   ├── evaluate.py
│   └── metrics.py
└── README.md
```

## Modules

| Module | Task | Architecture |
|--------|------|-------------|
| Plant ID | Species identification | MobileNetV2 (transfer learning) |
| Health | Healthy vs. Unhealthy | MobileNetV2 fine-tuned |
| Disease | Specific disease detection | EfficientNet-B0 |
| Recommender | Care recommendations | Rule-based engine (MVP) |
| Predictor | Health trend forecasting | Time-series (Future) |

## Status
🚧 Will be implemented in Step 6 (AI Model Integration)
