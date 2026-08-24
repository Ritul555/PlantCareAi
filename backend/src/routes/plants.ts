import { Router, Response } from 'express';
import { authenticateToken, AuthRequest } from '../middlewares/auth';
import { Plant } from '../db';

const router = Router();

// GET /plants/dashboard
router.get('/dashboard', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const plants = await Plant.findAll({ where: { userId } });

    const total = plants.length;
    const healthy = plants.filter((p: any) => p.currentStatus === 'healthy').length;
    const needsAttention = plants.filter((p: any) => ['mild_stress', 'needs_attention'].includes(p.currentStatus)).length;
    const highRisk = plants.filter((p: any) => p.currentStatus === 'high_risk').length;

    res.json({
      total_plants: total,
      healthy_plants: healthy,
      needs_attention: needsAttention,
      high_risk: highRisk,
      recent_scans: 0,
      sensors_online: 0
    });
  } catch (err) {
    res.status(500).json({ detail: 'Internal server error' });
  }
});

// GET /plants
router.get('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const plants = await Plant.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });
    res.json({
      plants: plants.map((p: any) => ({
        id: p.id,
        name: p.name,
        plant_type: p.plantType,
        scientific_name: p.scientificName,
        current_status: p.currentStatus,
        image_url: p.imageUrl,
        created_at: p.createdAt
      })),
      total: plants.length
    });
  } catch (err) {
    res.status(500).json({ detail: 'Internal server error' });
  }
});

// POST /plants
router.post('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { name, plant_type, scientific_name, description, location, category } = req.body;
    
    const plant = await Plant.create({
      userId: req.user.id,
      name,
      plantType: plant_type,
      scientificName: scientific_name,
      description,
      location,
      category,
      currentStatus: 'unknown'
    });

    res.status(201).json({
      id: (plant as any).id,
      name: (plant as any).name,
      plant_type: (plant as any).plantType,
      scientific_name: (plant as any).scientificName,
      current_status: (plant as any).currentStatus,
      created_at: (plant as any).createdAt
    });
  } catch (err) {
    res.status(500).json({ detail: 'Internal server error' });
  }
});

// GET /plants/:id
router.get('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const plant = await Plant.findOne({
      where: { id, userId: req.user.id }
    });

    if (!plant) {
      return res.status(404).json({ detail: 'Plant not found' });
    }

    res.json({
      id: (plant as any).id,
      name: (plant as any).name,
      plant_type: (plant as any).plantType,
      scientific_name: (plant as any).scientificName,
      description: (plant as any).description,
      location: (plant as any).location,
      category: (plant as any).category,
      current_status: (plant as any).currentStatus,
      image_url: (plant as any).imageUrl,
      created_at: (plant as any).createdAt
    });
  } catch (err) {
    res.status(500).json({ detail: 'Internal server error' });
  }
});

// DELETE /plants/:id
router.delete('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const plant = await Plant.findOne({
      where: { id, userId: req.user.id }
    });

    if (!plant) {
      return res.status(404).json({ detail: 'Plant not found' });
    }

    await (plant as any).destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ detail: 'Internal server error' });
  }
});

export default router;
