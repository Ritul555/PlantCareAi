# PlantCare AI — Training Datasets

This directory will contain training images for the AI models.

## Structure

```
dataset/
├── plant_identification/
│   ├── tomato/
│   ├── rose/
│   └── tulsi/
├── health_classification/
│   ├── healthy/
│   └── unhealthy/
├── disease_detection/
│   ├── tomato/
│   │   ├── healthy/
│   │   ├── leaf_spot/
│   │   ├── powdery_mildew/
│   │   └── blight/
│   └── rose/
│       ├── healthy/
│       ├── black_spot/
│       └── rust/
└── README.md
```

## Data Collection Guidelines

- Collect images under different lighting conditions
- Include different angles and backgrounds
- Different growth stages
- Healthy AND diseased/stressed conditions
- Use 70/15/15 train/validation/test split
- Avoid data leakage between splits

## Public Datasets

- [PlantVillage](https://www.kaggle.com/datasets/emmarex/plantdisease) — ~50K leaf images with 38 classes
- [Plant Pathology 2020](https://www.kaggle.com/c/plant-pathology-2020-fgvc7) — Apple leaf diseases

## Status
🚧 Will be populated starting in Step 6
