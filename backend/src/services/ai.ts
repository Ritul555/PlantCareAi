import { GoogleGenerativeAI } from '@google/generative-ai';

const PLANT_ANALYSIS_PROMPT = `
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
    "Recommendation 2"
  ],
  "image_quality": {
    "quality": "<good|acceptable|poor>",
    "confidence": "<high|medium|low>",
    "message": "Brief message about image quality and analysis reliability."
  }
}
`;

export async function analyzePlantImage(imageBuffer: Buffer, mimeType: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Gemini API key is not configured.');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const response = await model.generateContent([
    PLANT_ANALYSIS_PROMPT,
    {
      inlineData: {
        data: imageBuffer.toString('base64'),
        mimeType: mimeType
      }
    }
  ]);

  const rawText = response.response.text() || '';
  const jsonMatch = rawText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('AI response was not in expected JSON format.');
  }

  const data = JSON.parse(jsonMatch[0]);
  return _validateAndNormalize(data);
}

function _validateAndNormalize(data: any) {
  // Normalize exactly like the python version
  const issues = (data.issues || []).map((i: any) => typeof i === 'string' ? { name: i } : i);
  
  return {
    plant_name: data.plant_name || 'Unknown Plant',
    scientific_name: data.scientific_name || null,
    identification_confidence: data.identification_confidence || 0.5,
    health_score: data.health_score || 0,
    health_status: data.health_status || 'unknown',
    summary: data.summary || '',
    issues: issues,
    water_requirement: data.water?.recommendation || 'Medium',
    light_requirement: data.light?.recommendation || 'Bright Indirect',
    ai_explanation: data.summary || '',
    detected_disease: issues.find((i: any) => i.severity === 'High')?.name || null,
    detected_issues: issues.map((i: any) => i.name || 'Unknown'),
  };
}
