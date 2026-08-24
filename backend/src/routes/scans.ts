import { Router, Response } from 'express';
import multer from 'multer';
import { authenticateToken, AuthRequest } from '../middlewares/auth';
import { db } from '../db';
import { analyzePlantImage } from '../services/ai';
import jwt from 'jsonwebtoken';

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

const SECRET_KEY = process.env.SECRET_KEY || 'your-super-secret-key-change-this-in-production';

// Helper to optionally extract user from Authorization header if present
function tryGetUser(authHeader?: string) {
  if (!authHeader) return null;
  const token = authHeader.split(' ')[1];
  if (!token) return null;
  try {
    return jwt.verify(token, SECRET_KEY) as { id: number; sub: string };
  } catch {
    return null;
  }
}

// POST /scan (Standalone scan)
router.post('/', upload.single('image'), async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ detail: 'Image file is required' });
    }

    const analysis = await analyzePlantImage(req.file.buffer, req.file.mimetype);

    // Save scan if user is authenticated
    const user = tryGetUser(req.headers['authorization']);
    let scanId: number | null = null;
    
    const scan = await db.createScan({
      plantId: null,
      scanType: 'quick_scan',
      healthScore: analysis.health_score,
      healthStatus: analysis.health_status,
      identifiedPlantType: analysis.plant_name,
      identificationConfidence: analysis.identification_confidence,
      detectedDisease: analysis.detected_disease,
      visualAnalysis: JSON.stringify(analysis.observations),
      detectedIssues: JSON.stringify(analysis.detected_issues),
      aiExplanation: analysis.summary,
    });
    scanId = scan.id;

    return res.json({
      scan_id: scanId,
      plant_id: null,
      plant_name: analysis.plant_name,
      scientific_name: analysis.scientific_name,
      identification_confidence: analysis.identification_confidence,
      health_score: analysis.health_score,
      health_status: analysis.health_status,
      health_confidence: analysis.health_confidence,
      summary: analysis.summary,
      observations: analysis.observations,
      issues: analysis.issues,
      water: analysis.water,
      light: analysis.light,
      pests: analysis.pests,
      image_quality: analysis.image_quality,
      care_recommendations: analysis.care_recommendations,
      detected_issues: analysis.detected_issues,
      detected_disease: analysis.detected_disease,
      water_requirement: analysis.water_requirement,
      light_requirement: analysis.light_requirement,
      ai_explanation: analysis.ai_explanation,
      scanned_at: scan.createdAt,
    });
  } catch (err: any) {
    console.error('Scan error:', err);
    return res.status(500).json({ detail: err.message || 'AI analysis failed' });
  }
});

// POST /scan/plants/:id/scan or /plants/:id/scan
router.post('/plants/:id/scan', authenticateToken, upload.single('image'), async (req: AuthRequest, res: Response) => {
  try {
    const plantId = parseInt(req.params.id, 10);
    const userId = req.user.id;

    const plant = await db.findPlantById(plantId, userId);
    if (!plant) {
      return res.status(404).json({ detail: 'Plant not found' });
    }

    if (!req.file) {
      return res.status(400).json({ detail: 'Image file is required' });
    }

    const analysis = await analyzePlantImage(req.file.buffer, req.file.mimetype);

    const scan = await db.createScan({
      plantId,
      scanType: 'manual',
      healthScore: analysis.health_score,
      healthStatus: analysis.health_status,
      identifiedPlantType: analysis.plant_name,
      identificationConfidence: analysis.identification_confidence,
      detectedDisease: analysis.detected_disease,
      visualAnalysis: JSON.stringify(analysis.observations),
      detectedIssues: JSON.stringify(analysis.detected_issues),
      aiExplanation: analysis.summary,
    });

    await db.updatePlantStatus(plantId, analysis.health_status);

    return res.json({
      scan_id: scan.id,
      plant_id: plantId,
      plant_name: analysis.plant_name,
      scientific_name: analysis.scientific_name,
      identification_confidence: analysis.identification_confidence,
      health_score: analysis.health_score,
      health_status: analysis.health_status,
      health_confidence: analysis.health_confidence,
      summary: analysis.summary,
      observations: analysis.observations,
      issues: analysis.issues,
      water: analysis.water,
      light: analysis.light,
      pests: analysis.pests,
      image_quality: analysis.image_quality,
      care_recommendations: analysis.care_recommendations,
      detected_issues: analysis.detected_issues,
      detected_disease: analysis.detected_disease,
      water_requirement: analysis.water_requirement,
      light_requirement: analysis.light_requirement,
      ai_explanation: analysis.ai_explanation,
      scanned_at: scan.createdAt,
    });
  } catch (err: any) {
    console.error('Plant scan error:', err);
    return res.status(500).json({ detail: err.message || 'AI analysis failed' });
  }
});

export default router;
