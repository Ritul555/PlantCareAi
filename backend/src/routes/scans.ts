import { Router, Response } from 'express';
import multer from 'multer';
import { authenticateToken, AuthRequest } from '../middlewares/auth';
import { Plant, PlantScan } from '../db';
import { analyzePlantImage } from '../services/ai';

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

router.post('/', upload.single('image'), async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ detail: 'Image file is required' });
    }

    const analysis = await analyzePlantImage(req.file.buffer, req.file.mimetype);

    let scanId = null;

    res.json({
      scan_id: scanId,
      plant_name: analysis.plant_name,
      scientific_name: analysis.scientific_name,
      health_score: analysis.health_score,
      health_status: analysis.health_status,
      summary: analysis.summary,
      care_recommendations: [],
      detected_issues: analysis.detected_issues,
      detected_disease: analysis.detected_disease,
      water_requirement: analysis.water_requirement,
      light_requirement: analysis.light_requirement,
      ai_explanation: analysis.ai_explanation,
      scanned_at: new Date().toISOString(),
    });
  } catch (err: any) {
    res.status(500).json({ detail: err.message || 'AI analysis failed' });
  }
});

// Plants specific scan
router.post('/plants/:id/scan', authenticateToken, upload.single('image'), async (req: AuthRequest, res: Response) => {
  try {
    const plantId = parseInt(req.params.id);
    const userId = req.user.id;

    const plant = await Plant.findOne({ where: { id: plantId, userId } });
    if (!plant) {
      return res.status(404).json({ detail: 'Plant not found' });
    }

    if (!req.file) {
      return res.status(400).json({ detail: 'Image file is required' });
    }

    const analysis = await analyzePlantImage(req.file.buffer, req.file.mimetype);

    const scan = await PlantScan.create({
      plantId,
      scanType: 'manual',
      healthScore: analysis.health_score,
      healthStatus: analysis.health_status,
      identifiedPlantType: analysis.plant_name,
      detectedDisease: analysis.detected_disease,
      detectedIssues: JSON.stringify(analysis.detected_issues),
      aiExplanation: analysis.ai_explanation,
    });

    await (plant as any).update({ currentStatus: analysis.health_status });

    res.json({
      scan_id: (scan as any).id,
      plant_id: plantId,
      plant_name: analysis.plant_name,
      health_score: analysis.health_score,
      health_status: analysis.health_status,
      summary: analysis.summary,
      care_recommendations: [],
      scanned_at: (scan as any).createdAt.toISOString()
    });
  } catch (err: any) {
    res.status(500).json({ detail: err.message || 'AI analysis failed' });
  }
});

export default router;
