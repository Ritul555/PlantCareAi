"""
PlantCare AI — Gemini Vision AI Service

Analyzes plant images using Google Gemini Vision API.
Returns structured health analysis including:
  - Plant identification
  - Health score and status
  - Detected issues
  - Water and light requirements
  - Care recommendations
"""

import base64
import json
import logging
import re
from io import BytesIO
from typing import Optional

from PIL import Image

logger = logging.getLogger(__name__)

# ===========================
# Gemini Prompt Template
# ===========================
PLANT_ANALYSIS_PROMPT = """
You are an expert botanist and plant health specialist. Analyze this plant image carefully and provide a detailed health assessment.

Respond ONLY with a valid JSON object in this exact format (no markdown, no explanation outside JSON):

{
  "plant_name": "Common name of the plant (e.g. 'Peace Lily', 'Monstera', 'Rose', 'Tomato Plant'). If unidentifiable, use 'Unknown Plant'.",
  "scientific_name": "Scientific name if known, otherwise null",
  "health_score": <integer 0-100, where 100 is perfectly healthy>,
  "health_status": "<one of: healthy | mild_stress | needs_attention | high_risk | critical>",
  "detected_issues": [
    "List of specific issues observed (e.g. 'Yellowing leaves', 'Brown leaf tips', 'Wilting', 'Powdery mildew', 'Root rot signs'). Empty list if healthy."
  ],
  "detected_disease": "<specific disease name if detected, e.g. 'Powdery Mildew', 'Leaf Spot', 'Root Rot', or null if none>",
  "disease_confidence": <float 0.0-1.0 confidence in disease detection, or null>,
  "water_requirement": "<one of: Low | Medium | High>",
  "light_requirement": "<one of: Full Sun | Partial Shade | Full Shade | Bright Indirect>",
  "air_recommendation": "Air quality or humidity recommendation for this plant (1 sentence)",
  "ai_explanation": "A clear 2-3 sentence explanation of what you observe in this plant image, its overall condition, and any concerns.",
  "care_recommendations": [
    "Specific actionable care tip 1",
    "Specific actionable care tip 2",
    "Specific actionable care tip 3"
  ],
  "identification_confidence": <float 0.0-1.0 confidence in plant identification>
}

Important rules:
- health_score 90-100 = healthy
- health_score 70-89 = mild_stress  
- health_score 50-69 = needs_attention
- health_score 25-49 = high_risk
- health_score 0-24 = critical
- Be specific and honest about any visible problems
- If image is not a plant, set health_status to "unknown" and explain in ai_explanation
"""


# ===========================
# AI Analysis Function
# ===========================
def analyze_plant_image(
    image_bytes: bytes,
    content_type: str = "image/jpeg",
) -> dict:
    """
    Analyze a plant image using Google Gemini Vision API.

    Uses the new `google-genai` SDK (supports AQ. API keys from AI Studio).

    Args:
        image_bytes: Raw image bytes
        content_type: MIME type of the image

    Returns:
        dict with structured plant health analysis
    """
    try:
        from google import genai
        from google.genai import types
        from app.config import settings

        # Check API key
        if not settings.GEMINI_API_KEY or settings.GEMINI_API_KEY == "your-gemini-api-key-here":
            logger.warning("Gemini API key not configured — returning mock analysis")
            return _mock_analysis()

        # Configure new genai client
        client = genai.Client(api_key=settings.GEMINI_API_KEY)

        # Build image part using inline data
        image_part = types.Part.from_bytes(
            data=image_bytes,
            mime_type=content_type,
        )

        # Call Gemini Vision
        model = settings.GEMINI_MODEL
        logger.info(f"Sending image to Gemini ({model})...")

        response = client.models.generate_content(
            model=model,
            contents=[PLANT_ANALYSIS_PROMPT, image_part],
        )

        # Parse JSON response
        raw_text = response.text.strip()
        logger.debug(f"Gemini raw response: {raw_text[:200]}...")

        # Extract JSON (handle cases where Gemini wraps in markdown)
        json_match = re.search(r"\{.*\}", raw_text, re.DOTALL)
        if json_match:
            raw_text = json_match.group(0)

        result = json.loads(raw_text)
        logger.info(f"Gemini analysis complete: status={result.get('health_status')}, score={result.get('health_score')}")
        return _validate_and_normalize(result)

    except json.JSONDecodeError as e:
        logger.error(f"Failed to parse Gemini JSON response: {e}")
        return _mock_analysis(error="AI returned unexpected format")

    except ImportError:
        logger.error("google-genai not installed. Run: pip install google-genai")
        return _mock_analysis(error="Gemini SDK not installed")

    except Exception as e:
        logger.error(f"Gemini analysis failed: {e}")
        return _mock_analysis(error=str(e))


# ===========================
# Helpers
# ===========================
def _validate_and_normalize(data: dict) -> dict:
    """Ensure all required fields exist with valid values."""
    valid_statuses = {"healthy", "mild_stress", "needs_attention", "high_risk", "critical", "unknown"}
    valid_water = {"Low", "Medium", "High"}
    valid_light = {"Full Sun", "Partial Shade", "Full Shade", "Bright Indirect"}

    health_score = int(data.get("health_score", 50))
    health_score = max(0, min(100, health_score))

    health_status = data.get("health_status", "unknown")
    if health_status not in valid_statuses:
        health_status = _score_to_status(health_score)

    return {
        "plant_name": data.get("plant_name") or "Unknown Plant",
        "scientific_name": data.get("scientific_name"),
        "health_score": health_score,
        "health_status": health_status,
        "detected_issues": data.get("detected_issues") or [],
        "detected_disease": data.get("detected_disease"),
        "disease_confidence": data.get("disease_confidence"),
        "water_requirement": data.get("water_requirement", "Medium") if data.get("water_requirement") in valid_water else "Medium",
        "light_requirement": data.get("light_requirement", "Bright Indirect") if data.get("light_requirement") in valid_light else "Bright Indirect",
        "air_recommendation": data.get("air_recommendation") or "Maintain good air circulation around your plant.",
        "ai_explanation": data.get("ai_explanation") or "Analysis complete.",
        "care_recommendations": data.get("care_recommendations") or ["Water regularly", "Ensure adequate light", "Check for pests"],
        "identification_confidence": data.get("identification_confidence"),
    }


def _score_to_status(score: int) -> str:
    if score >= 90:
        return "healthy"
    elif score >= 70:
        return "mild_stress"
    elif score >= 50:
        return "needs_attention"
    elif score >= 25:
        return "high_risk"
    return "critical"


def _mock_analysis(error: Optional[str] = None) -> dict:
    """
    Returns a realistic mock response when Gemini is unavailable.
    Used for development/testing without an API key.
    """
    base = {
        "plant_name": "Demo Plant (Mock Mode)",
        "scientific_name": None,
        "health_score": 72,
        "health_status": "mild_stress",
        "detected_issues": ["Slight yellowing on lower leaves", "Minor leaf tip browning"],
        "detected_disease": None,
        "disease_confidence": None,
        "water_requirement": "Medium",
        "light_requirement": "Bright Indirect",
        "air_recommendation": "Maintain moderate humidity (40-60%) and ensure good air circulation.",
        "ai_explanation": (
            "This plant appears to be in mild stress. "
            "Some lower leaves show yellowing which could indicate overwatering or nutrient deficiency. "
            "Overall the plant looks recoverable with proper care."
        ),
        "care_recommendations": [
            "Reduce watering frequency — allow top 2cm of soil to dry between waterings",
            "Check for nutrient deficiency — consider a balanced liquid fertilizer",
            "Remove yellowing leaves to redirect plant energy",
            "Ensure the pot has proper drainage holes",
        ],
        "identification_confidence": 0.0,
    }
    if error:
        base["ai_explanation"] = f"[Mock mode — {error}] " + base["ai_explanation"]
    return base
