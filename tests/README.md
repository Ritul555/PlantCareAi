# PlantCare AI — Tests

## Structure

```
tests/
├── backend/        # Backend unit and integration tests
├── ai/             # AI model tests
└── integration/    # End-to-end integration tests
```

## Running Tests

```bash
# Backend tests
cd backend
pytest tests/ -v

# With coverage
pytest tests/ --cov=app --cov-report=html
```

## Status
🚧 Tests will be added alongside each feature
