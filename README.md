# 🌱 PlantCare AI

**AI-Powered Plant Digital Health Assistant**

> Use your phone camera and optional low-cost sensors to understand what your plant may need, monitor its health over time, and receive personalized care guidance.

---

## 🎯 What is PlantCare AI?

PlantCare AI is a complete plant health monitoring platform that combines:
- **📸 Computer Vision** — Identify plants and analyze health from photos
- **📡 IoT Sensors** — Real-time soil moisture, temperature, and humidity data
- **🤖 AI Recommendations** — Personalized care guidance based on multiple data sources
- **📊 Health Tracking** — Monitor your plant's health over time with trends and alerts

### Core Pipeline
```
SCAN → SENSE → ANALYZE → RECOMMEND → TRACK → PREDICT
```

---

## 🏗️ Architecture

| Layer | Technology |
|-------|-----------|
| Mobile | Flutter (Dart) |
| Backend | Python + FastAPI |
| AI/ML | PyTorch + MobileNetV2 |
| Database | PostgreSQL |
| IoT | ESP32 + DHT22 + Soil Moisture Sensor |
| Deployment | Docker + Docker Compose |

---

## 📁 Project Structure

```
plantcare-ai/
├── mobile/          # Flutter mobile app
├── backend/         # Python FastAPI backend
├── ai/              # AI/ML training & inference
├── iot/             # ESP32 sensor firmware
├── dataset/         # Training datasets
├── models/          # Trained model files
├── docs/            # Documentation
├── tests/           # Test suites
├── docker-compose.yml
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites
- Python 3.10+
- PostgreSQL 15+ (or Docker)
- Flutter SDK 3.x
- Git

### Backend Setup

```bash
# 1. Clone the repository
git clone <repo-url>
cd plantcare-ai

# 2. Create virtual environment
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux

# 3. Install dependencies
pip install -r requirements.txt

# 4. Set up environment variables
copy ..\.env.example .env     # Windows
# cp ../.env.example .env     # macOS/Linux

# 5. Start PostgreSQL (via Docker)
cd ..
docker-compose up -d db

# 6. Run database migrations
cd backend
alembic upgrade head

# 7. Start the server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Mobile Setup
```bash
cd mobile
flutter pub get
flutter run
```

---

## 📡 API Documentation

Once the backend is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

---

## 🧪 Testing

```bash
# Backend tests
cd backend
pytest tests/ -v

# Flutter tests
cd mobile
flutter test
```

---

## 🌿 MVP Phases

| Phase | Features | Status |
|-------|----------|--------|
| Phase 1 | Auth, Plant Management, AI Image Analysis | 🔨 In Progress |
| Phase 2 | Disease Detection, History, Notifications | ⏳ Planned |
| Phase 3 | ESP32 IoT Sensors, Live Dashboard | ⏳ Planned |
| Phase 4 | Weather API, Advanced Analytics | ⏳ Planned |
| Phase 5 | Nursery Mode, Admin Dashboard | ⏳ Planned |

---

## 🔒 Security

- Password hashing with bcrypt
- JWT token authentication
- Input validation (Pydantic)
- Rate limiting on auth endpoints
- CORS protection
- Environment-based secret management

---

## 📄 License

MIT License — See [LICENSE](LICENSE) for details.

---

## 🤝 Contributing

Contributions are welcome! Please read the contributing guidelines before submitting a pull request.

---

*Built with ❤️ for plant lovers everywhere*
