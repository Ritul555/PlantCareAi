"""
PlantCare AI — Gemini Vision AI Service (v2)

Analyzes plant images using google-genai SDK v2.x with gemini-2.5-flash.
Returns detailed structured analysis — NO mock data.
"""

import json
import logging
import re
from typing import Optional

logger = logging.getLogger(__name__)

PLANT_ANALYSIS_PROMPT = """
You are an expert botanist, plant pathologist, and horticulturist.
Analyze this plant image carefully and provide a detailed, honest, accurate assessment.

CRITICAL RULES:
1. Only describe what you can ACTUALLY SEE in the image. Do NOT invent diseases, pests, or problems.
2. Clearly distinguish between "observed from image" and "possible cause".
3. If the image is blurry, dark, or unclear, say so honestly in image_quality.
4. Do NOT claim to measure soil moisture, temperature, humidity, or nutrients from the image.
5. Use cautious language when certainty is low: "may indicate", "possible", "appears to".
6. If you cannot identify the plant, say "Unknown Plant" with low confidence.
7. If no pest is visible, say so clearly. Do NOT invent pests.

Respond ONLY with a valid JSON object — no markdown, no text outside JSON:

{
  "plant_name": "Common name. Use Unknown Plant if unidentifiable.",
  "scientific_name": "Scientific name if confident, otherwise null",
  "identification_confidence": <float 0.0-1.0>,
  "health_score": <integer 0-100>,
  "health_status": "<healthy|mild_stress|needs_attention|high_risk|critical|unknown>",
  "health_confidence": <float 0.0-1.0>,
  "summary": "2-3 sentence summary of what you observe.",
  "observations": ["Specific visual observation 1", "Observation 2"],
  "issues": [
    {
      "name": "Issue name",
      "severity": "<Low|Medium|High>",
      "evidence": "Exactly what you see indicating this issue",
      "possible_cause": "Possible cause (be honest about uncertainty)",
      "recommendation": "Specific actionable step"
    }
  ],
  "water": {
    "assessment": "Visual water status — state if soil not visible",
    "recommendation": "Watering guidance based on visible symptoms"
  },
  "light": {
    "assessment": "Light condition assessment from visible clues",
    "recommendation": "Suggested light condition"
  },
  "pests": {
    "assessment": "What you see about pests. If none visible: No obvious pest damage or insects are visible in the provided image."
  },
  "care_recommendations": [
    "Specific recommendation 1",
    "Recommendation 2",
    "Recommendation 3",
    "Recommendation 4",
    "Recommendation 5"
  ],
  "image_quality": {
    "quality": "<good|acceptable|poor>",
    "confidence": "<high|medium|low>",
    "message": "Brief message about image quality and analysis reliability."
  }
}

Health score: 90-100=healthy, 70-89=mild_stress, 50-69=needs_attention, 25-49=high_risk, 0-24=critical
If image is NOT a plant: set plant_name=Not a Plant, health_status=unknown, health_score=0.
"""


def analyze_plant_image(image_bytes: bytes, content_type: str = "image/jpeg") -> dict:
    """
    Analyze plant image using Google Gemini Vision API (google-genai SDK).
    Uses gemini-2.5-flash. NO mock data — returns real error on failure.
    """
    try:
        from google import genai
        from google.genai import types
        from app.config import settings

        if not settings.GEMINI_API_KEY or settings.GEMINI_API_KEY in ("your-gemini-api-key-here", "", None):
            return _error_response("Gemini API key is not configured in the backend .env file.")

        client = genai.Client(api_key=settings.GEMINI_API_KEY)
        safe_mime = content_type if content_type and content_type.startswith("image/") else "image/jpeg"
        image_part = types.Part.from_bytes(data=image_bytes, mime_type=safe_mime)

        model = "gemini-2.5-flash"
        logger.info(f"Sending {len(image_bytes)} bytes ({safe_mime}) to {model}...")

        response = client.models.generate_content(
            model=model,
            contents=[PLANT_ANALYSIS_PROMPT, image_part],
        )

        raw_text = response.text.strip() if response.text else ""
        if not raw_text:
            return _error_response("AI returned an empty response. Please try again.")

        json_match = re.search(r"\{.*\}", raw_text, re.DOTALL)
        if not json_match:
            logger.error(f"No JSON in response: {raw_text[:300]}")
            return _error_response("AI response was not in expected format. Please try again.")

        result = json.loads(json_match.group(0))
        logger.info(f"Analysis OK: {result.get('plant_name')} / {result.get('health_status')} / {result.get('health_score')}")
        return _validate_and_normalize(result)

    except json.JSONDecodeError as e:
        logger.error(f"JSON parse error: {e}")
        return _error_response("AI returned a response that could not be parsed.")
    except ImportError:
        return _error_response("Gemini SDK not installed. Run: pip install google-genai")
    except Exception as e:
        err = str(e)
        logger.error(f"Gemini error: {err}")
        if "API_KEY_INVALID" in err or "invalid api key" in err.lower():
            return _error_response("Invalid Gemini API key. Check GEMINI_API_KEY in .env.")
        if "quota" in err.lower() or "rate" in err.lower():
            return _error_response("Gemini API rate limit reached. Please wait and try again.")
        if "not found" in err.lower() or "404" in err:
            return _error_response(f"Gemini model not found: {err}")
        if "timeout" in err.lower():
            return _error_response("Request timed out. Try again with a smaller image.")
        return _error_response(f"AI analysis failed: {err}")


def _validate_and_normalize(data: dict) -> dict:
    valid_statuses = {"healthy", "mild_stress", "needs_attention", "high_risk", "critical", "unknown"}
    health_score = max(0, min(100, int(data.get("health_score") or 0)))
    health_status = data.get("health_status", "unknown")
    if health_status not in valid_statuses:
        health_status = _score_to_status(health_score)

    raw_issues = data.get("issues") or []
    issues = []
    for item in raw_issues:
        if isinstance(item, dict):
            issues.append({
                "name": item.get("name", "Unknown Issue"),
                "severity": item.get("severity", "Medium"),
                "evidence": item.get("evidence", ""),
                "possible_cause": item.get("possible_cause", ""),
                "recommendation": item.get("recommendation", ""),
            })
        elif isinstance(item, str):
            issues.append({"name": item, "severity": "Medium", "evidence": "", "possible_cause": "", "recommendation": ""})

    water = data.get("water") or {}
    if isinstance(water, str): water = {"assessment": water, "recommendation": ""}
    light = data.get("light") or {}
    if isinstance(light, str): light = {"assessment": light, "recommendation": ""}
    pests = data.get("pests") or {}
    if isinstance(pests, str): pests = {"assessment": pests}
    iq = data.get("image_quality") or {}
    if isinstance(iq, str): iq = {"quality": "acceptable", "confidence": "medium", "message": iq}

    return {
        "plant_name": data.get("plant_name") or "Unknown Plant",
        "scientific_name": data.get("scientific_name"),
        "identification_confidence": float(data.get("identification_confidence") or 0.5),
        "health_score": health_score,
        "health_status": health_status,
        "health_confidence": float(data.get("health_confidence") or 0.5),
        "summary": data.get("summary") or "Analysis complete.",
        "observations": data.get("observations") or [],
        "issues": issues,
        "water": {"assessment": water.get("assessment", ""), "recommendation": water.get("recommendation", "")},
        "light": {"assessment": light.get("assessment", ""), "recommendation": light.get("recommendation", "")},
        "pests": {"assessment": pests.get("assessment", "No obvious pest damage visible in the provided image.")},
        "care_recommendations": data.get("care_recommendations") or [],
        "image_quality": {
            "quality": iq.get("quality", "acceptable"),
            "confidence": iq.get("confidence", "medium"),
            "message": iq.get("message", ""),
        },
        # Legacy fields for DB compatibility
        "detected_issues": [i["name"] for i in issues],
        "detected_disease": next((i["name"] for i in issues if i.get("severity") == "High"), None),
        "disease_confidence": None,
        "water_requirement": _extract_water_level(water.get("recommendation", "")),
        "light_requirement": _extract_light_level(light.get("recommendation", "")),
        "air_recommendation": None,
        "ai_explanation": data.get("summary") or "Analysis complete.",
        "_error": False,
    }


def _score_to_status(score: int) -> str:
    if score >= 90: return "healthy"
    elif score >= 70: return "mild_stress"
    elif score >= 50: return "needs_attention"
    elif score >= 25: return "high_risk"
    return "critical"


def _extract_water_level(text: str) -> str:
    t = text.lower()
    if any(x in t for x in ["low", "less", "reduce", "sparingly"]): return "Low"
    if any(x in t for x in ["high", "frequent", "more water", "increase"]): return "High"
    return "Medium"


def _extract_light_level(text: str) -> str:
    t = text.lower()
    if "full sun" in t or "direct sun" in t: return "Full Sun"
    if "partial shade" in t: return "Partial Shade"
    if "full shade" in t: return "Full Shade"
    return "Bright Indirect"


def _error_response(message: str) -> dict:
    logger.error(f"AI error response: {message}")
    return {
        "plant_name": "Analysis Failed",
        "scientific_name": None,
        "identification_confidence": 0.0,
        "health_score": 0,
        "health_status": "unknown",
        "health_confidence": 0.0,
        "summary": f"AI analysis could not be completed. Reason: {message}",
        "observations": [],
        "issues": [],
        "water": {"assessment": "Cannot assess — analysis failed.", "recommendation": ""},
        "light": {"assessment": "Cannot assess — analysis failed.", "recommendation": ""},
        "pests": {"assessment": "Cannot assess — analysis failed."},
        "care_recommendations": [],
        "image_quality": {"quality": "unknown", "confidence": "low", "message": "Analysis failed."},
        "detected_issues": [],
        "detected_disease": None,
        "disease_confidence": None,
        "water_requirement": "Medium",
        "light_requirement": "Bright Indirect",
        "air_recommendation": None,
        "ai_explanation": f"Error: {message}",
        "_error": True,
        "_error_message": message,
    }
