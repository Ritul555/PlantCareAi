import { Router, Response } from 'express';
import { authenticateToken, AuthRequest } from '../middlewares/auth';
import { db } from '../db';

const router = Router();

// GET /plants/dashboard
router.get('/dashboard', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const stats = await db.getDashboardStats(req.user.id);
    return res.json(stats);
  } catch (err: any) {
    console.error('Dashboard stats error:', err);
    return res.status(500).json({ detail: 'Internal server error' });
  }
});

// GET /plants
router.get('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const plants = await db.findPlantsByUserId(req.user.id);
    return res.json({
      plants: plants.map(p => ({
        id: p.id,
        name: p.name,
        plant_type: p.plantType,
        scientific_name: p.scientificName,
        description: p.description,
        location: p.location,
        category: p.category,
        current_status: p.currentStatus,
        image_url: p.imageUrl,
        created_at: p.createdAt
      })),
      total: plants.length
    });
  } catch (err: any) {
    console.error('Get plants error:', err);
    return res.status(500).json({ detail: 'Internal server error' });
  }
});

// POST /plants
router.post('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { name, plant_type, scientific_name, description, location, category, image_url } = req.body || {};
    
    if (!name) {
      return res.status(400).json({ detail: 'Plant name is required' });
    }

    const plant = await db.createPlant({
      userId: req.user.id,
      name,
      plantType: plant_type,
      scientificName: scientific_name,
      description,
      location,
      category,
      imageUrl: image_url
    });

    return res.status(201).json({
      id: plant.id,
      name: plant.name,
      plant_type: plant.plantType,
      scientific_name: plant.scientificName,
      description: plant.description,
      location: plant.location,
      category: plant.category,
      current_status: plant.currentStatus,
      image_url: plant.imageUrl,
      created_at: plant.createdAt
    });
  } catch (err: any) {
    console.error('Create plant error:', err);
    return res.status(500).json({ detail: 'Internal server error' });
  }
});

// GET /plants/:id
router.get('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const plant = await db.findPlantById(id, req.user.id);

    if (!plant) {
      return res.status(404).json({ detail: 'Plant not found' });
    }

    return res.json({
      id: plant.id,
      name: plant.name,
      plant_type: plant.plantType,
      scientific_name: plant.scientificName,
      description: plant.description,
      location: plant.location,
      category: plant.category,
      current_status: plant.currentStatus,
      image_url: plant.imageUrl,
      created_at: plant.createdAt
    });
  } catch (err: any) {
    console.error('Get plant by id error:', err);
    return res.status(500).json({ detail: 'Internal server error' });
  }
});

// DELETE /plants/:id
router.delete('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const deleted = await db.deletePlant(id, req.user.id);

    if (!deleted) {
      return res.status(404).json({ detail: 'Plant not found' });
    }

    return res.status(204).send();
  } catch (err: any) {
    console.error('Delete plant error:', err);
    return res.status(500).json({ detail: 'Internal server error' });
  }
});

export default router;
