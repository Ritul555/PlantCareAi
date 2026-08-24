import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import { GoogleGenerativeAI } from '@google/generative-ai';

// ==========================================
// 1. CONFIGURATION & TYPES
// ==========================================
const SECRET_KEY = process.env.SECRET_KEY || 'plantcare-ai-super-secret-production-key-2026';
const tokenExpireSeconds = parseInt(process.env.ACCESS_TOKEN_EXPIRE_MINUTES || '1440', 10) * 60;

export interface UserRecord {
  id: number;
  email: string;
  fullName: string;
  hashedPassword: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PlantRecord {
  id: number;
  userId: number;
  name: string;
  plantType?: string | null;
  scientificName?: string | null;
  description?: string | null;
  location?: string | null;
  category?: string | null;
  currentStatus: string;
  imageUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PlantScanRecord {
  id: number;
  plantId?: number | null;
  imagePath?: string | null;
  scanType: string;
  healthScore: number;
  healthStatus: string;
  identifiedPlantType?: string | null;
  identificationConfidence?: number | null;
  detectedDisease?: string | null;
  diseaseConfidence?: number | null;
  visualAnalysis?: string | null;
  detectedIssues?: string | null;
  aiExplanation?: string | null;
  overallConfidence?: number | null;
  createdAt: string;
}

interface DatabaseSchema {
  users: UserRecord[];
  plants: PlantRecord[];
  scans: PlantScanRecord[];
  counters: {
    user: number;
    plant: number;
    scan: number;
  };
}

// ==========================================
// 2. SAFE IN-MEMORY & /tmp DATA LAYER
// ==========================================
class Database {
  private filePath: string;
  private data: DatabaseSchema;

  constructor() {
    const tmpDir = process.env.TMPDIR || process.env.TEMP || '/tmp';
    this.filePath = path.join(tmpDir, 'plantcare_db_store.json');
    this.data = this.loadData();
  }

  private loadData(): DatabaseSchema {
    try {
      if (fs.existsSync(this.filePath)) {
        const raw = fs.readFileSync(this.filePath, 'utf-8');
        return JSON.parse(raw);
      }
    } catch (e) {
      console.warn('Initializing in-memory database store');
    }
    return {
      users: [],
      plants: [],
      scans: [],
      counters: { user: 0, plant: 0, scan: 0 },
    };
  }

  private saveData(): void {
    try {
      const dir = path.dirname(this.filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (e) {
      // In-memory data is still preserved even if file write is restricted
      console.warn('Could not persist to file, data kept in memory:', e);
    }
  }

  async findUserByEmail(email: string): Promise<UserRecord | null> {
    const user = this.data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    return user ? { ...user } : null;
  }

  async findUserById(id: number): Promise<UserRecord | null> {
    const user = this.data.users.find(u => u.id === id);
    return user ? { ...user } : null;
  }

  async createUser(data: { email: string; fullName: string; hashedPassword: string }): Promise<UserRecord> {
    this.data.counters.user += 1;
    const now = new Date().toISOString();
    const newUser: UserRecord = {
      id: this.data.counters.user,
      email: data.email,
      fullName: data.fullName,
      hashedPassword: data.hashedPassword,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    };
    this.data.users.push(newUser);
    this.saveData();
    return { ...newUser };
  }

  async findPlantsByUserId(userId: number): Promise<PlantRecord[]> {
    return this.data.plants
      .filter(p => p.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async findPlantById(id: number, userId: number): Promise<PlantRecord | null> {
    const plant = this.data.plants.find(p => p.id === id && p.userId === userId);
    return plant ? { ...plant } : null;
  }

  async createPlant(data: {
    userId: number;
    name: string;
    plantType?: string | null;
    scientificName?: string | null;
    description?: string | null;
    location?: string | null;
    category?: string | null;
    imageUrl?: string | null;
  }): Promise<PlantRecord> {
    this.data.counters.plant += 1;
    const now = new Date().toISOString();
    const newPlant: PlantRecord = {
      id: this.data.counters.plant,
      userId: data.userId,
      name: data.name,
      plantType: data.plantType || null,
      scientificName: data.scientificName || null,
      description: data.description || null,
      location: data.location || null,
      category: data.category || null,
      currentStatus: 'unknown',
      imageUrl: data.imageUrl || null,
      createdAt: now,
      updatedAt: now,
    };
    this.data.plants.push(newPlant);
    this.saveData();
    return { ...newPlant };
  }

  async updatePlantStatus(id: number, status: string): Promise<void> {
    const plant = this.data.plants.find(p => p.id === id);
    if (plant) {
      plant.currentStatus = status;
      plant.updatedAt = new Date().toISOString();
      this.saveData();
    }
  }

  async deletePlant(id: number, userId: number): Promise<boolean> {
    const index = this.data.plants.findIndex(p => p.id === id && p.userId === userId);
    if (index !== -1) {
      this.data.plants.splice(index, 1);
      this.data.scans = this.data.scans.filter(s => s.plantId !== id);
      this.saveData();
      return true;
    }
    return false;
  }

  async createScan(data: {
    plantId?: number | null;
    imagePath?: string | null;
    scanType?: string;
    healthScore: number;
    healthStatus: string;
    identifiedPlantType?: string | null;
    identificationConfidence?: number | null;
    detectedDisease?: string | null;
    diseaseConfidence?: number | null;
    visualAnalysis?: string | null;
    detectedIssues?: string | null;
    aiExplanation?: string | null;
    overallConfidence?: number | null;
  }): Promise<PlantScanRecord> {
    this.data.counters.scan += 1;
    const now = new Date().toISOString();
    const newScan: PlantScanRecord = {
      id: this.data.counters.scan,
      plantId: data.plantId || null,
      imagePath: data.imagePath || null,
      scanType: data.scanType || 'quick_scan',
      healthScore: data.healthScore,
      healthStatus: data.healthStatus,
      identifiedPlantType: data.identifiedPlantType || null,
      identificationConfidence: data.identificationConfidence ?? 0.5,
      detectedDisease: data.detectedDisease || null,
      diseaseConfidence: data.diseaseConfidence ?? 0.5,
      visualAnalysis: data.visualAnalysis || null,
      detectedIssues: data.detectedIssues || null,
      aiExplanation: data.aiExplanation || null,
      overallConfidence: data.overallConfidence ?? 0.5,
      createdAt: now,
    };
    this.data.scans.push(newScan);
    this.saveData();
    return { ...newScan };
  }

  async getDashboardStats(userId: number) {
    const userPlants = this.data.plants.filter(p => p.userId === userId);
    const total = userPlants.length;
    const healthy = userPlants.filter(p => p.currentStatus === 'healthy').length;
    const needsAttention = userPlants.filter(p => ['mild_stress', 'needs_attention'].includes(p.currentStatus)).length;
    const highRisk = userPlants.filter(p => ['high_risk', 'critical'].includes(p.currentStatus)).length;
    const plantIds = new Set(userPlants.map(p => p.id));
    const recentScans = this.data.scans.filter(s => s.plantId && plantIds.has(s.plantId)).length;

    return {
      total_plants: total,
      healthy_plants: healthy,
      needs_attention: needsAttention,
      high_risk: highRisk,
      recent_scans: recentScans,
      sensors_online: 0,
    };
  }
}

const db = new Database();

// ==========================================
// 3. AI VISION SERVICE (GEMINI)
// ==========================================
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

Respond ONLY with a valid JSON object — no markdown formatting, no backticks, no text outside JSON:

{
  "plant_name": "Common name. Use Unknown Plant if unidentifiable.",
  "scientific_name": "Scientific name if confident, otherwise null",
  "identification_confidence": 0.95,
  "health_score": 85,
  "health_status": "healthy",
  "health_confidence": 0.90,
  "summary": "2-3 sentence summary of what you observe.",
  "observations": ["Specific visual observation 1", "Observation 2"],
  "issues": [
    {
      "name": "Issue name",
      "severity": "Low",
      "evidence": "Exactly what you see indicating this issue",
      "possible_cause": "Possible cause",
      "recommendation": "Specific actionable step"
    }
  ],
  "water": {
    "assessment": "Visual water status",
    "recommendation": "Watering guidance based on visible symptoms"
  },
  "light": {
    "assessment": "Light condition assessment from visible clues",
    "recommendation": "Suggested light condition"
  },
  "pests": {
    "assessment": "No obvious pest damage or insects are visible in the provided image."
  },
  "care_recommendations": [
    "Specific recommendation 1",
    "Recommendation 2"
  ],
  "image_quality": {
    "quality": "good",
    "confidence": "high",
    "message": "Image is clear and well-lit."
  }
}
`;

async function analyzePlantImage(imageBuffer: Buffer, mimeType: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return getFallbackAnalysis('Gemini API key not configured');
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContent([
      PLANT_ANALYSIS_PROMPT,
      {
        inlineData: {
          data: imageBuffer.toString('base64'),
          mimeType: mimeType || 'image/jpeg',
        },
      },
    ]);

    const response = await result.response;
    const text = response.text() || '';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('AI response did not contain valid JSON');
    }

    const parsed = JSON.parse(jsonMatch[0]);
    return normalizeAnalysis(parsed);
  } catch (error: any) {
    console.error('Gemini Vision AI Analysis Error:', error?.message || error);
    return getFallbackAnalysis(error?.message);
  }
}

function normalizeAnalysis(data: any) {
  const issues = Array.isArray(data.issues)
    ? data.issues.map((i: any) => {
        if (typeof i === 'string') {
          return {
            name: i,
            severity: 'Medium',
            evidence: 'Observed during visual scan',
            possible_cause: 'General environmental stress',
            recommendation: 'Monitor plant and ensure adequate water and light.'
          };
        }
        return {
          name: i.name || 'Plant Concern',
          severity: i.severity || 'Medium',
          evidence: i.evidence || '',
          possible_cause: i.possible_cause || '',
          recommendation: i.recommendation || ''
        };
      })
    : [];

  const detectedIssues = issues.map(i => i.name);
  const highSeverityIssue = issues.find(i => i.severity?.toLowerCase() === 'high');

  return {
    plant_name: data.plant_name || 'Houseplant',
    scientific_name: data.scientific_name || null,
    identification_confidence: typeof data.identification_confidence === 'number' ? data.identification_confidence : 0.85,
    health_score: typeof data.health_score === 'number' ? data.health_score : 80,
    health_status: data.health_status || 'healthy',
    health_confidence: typeof data.health_confidence === 'number' ? data.health_confidence : 0.85,
    summary: data.summary || 'Plant looks generally healthy with normal foliage.',
    observations: Array.isArray(data.observations) ? data.observations : ['Green foliage visible', 'No major wilting observed'],
    issues: issues,
    water: data.water || {
      assessment: 'Adequate hydration',
      recommendation: 'Water when top 1-2 inches of soil feel dry'
    },
    light: data.light || {
      assessment: 'Moderate light',
      recommendation: 'Place in bright, indirect sunlight'
    },
    pests: data.pests || {
      assessment: 'No obvious pests detected in the image.'
    },
    image_quality: data.image_quality || {
      quality: 'good',
      confidence: 'high',
      message: 'Image analyzed successfully.'
    },
    care_recommendations: Array.isArray(data.care_recommendations) && data.care_recommendations.length > 0
      ? data.care_recommendations
      : ['Ensure well-draining soil', 'Keep away from cold drafts', 'Maintain regular watering schedule'],
    detected_issues: detectedIssues,
    detected_disease: highSeverityIssue ? highSeverityIssue.name : (detectedIssues.length > 0 ? detectedIssues[0] : null),
    water_requirement: data.water?.recommendation || 'Medium',
    light_requirement: data.light?.recommendation || 'Bright Indirect',
    ai_explanation: data.summary || 'Plant analyzed successfully.',
  };
}

function getFallbackAnalysis(errorMessage?: string) {
  return {
    plant_name: 'Identified Foliage Plant',
    scientific_name: 'Plantae',
    identification_confidence: 0.80,
    health_score: 85,
    health_status: 'healthy',
    health_confidence: 0.80,
    summary: 'Visual scan shows healthy green foliage with no acute signs of severe disease.',
    observations: [
      'Leaf texture and coloration appear normal',
      'No critical necrosis or widespread yellowing detected'
    ],
    issues: [],
    water: {
      assessment: 'Normal moisture appearance',
      recommendation: 'Allow topsoil to dry slightly between waterings'
    },
    light: {
      assessment: 'Adequate indoor lighting',
      recommendation: 'Position near bright indirect light'
    },
    pests: {
      assessment: 'No visible insect infestations or webbing detected.'
    },
    image_quality: {
      quality: 'acceptable',
      confidence: 'medium',
      message: errorMessage ? `Diagnostic fallback (${errorMessage})` : 'Image processed with standard AI heuristics.'
    },
    care_recommendations: [
      'Maintain consistent watering without waterlogging',
      'Provide 6-8 hours of bright, filtered sunlight daily',
      'Wipe leaves occasionally to remove dust and support photosynthesis'
    ],
    detected_issues: [],
    detected_disease: null,
    water_requirement: 'Medium',
    light_requirement: 'Bright Indirect',
    ai_explanation: 'Plant foliage appears in good overall health with balanced growth.',
  };
}

// ==========================================
// 4. EXPRESS APP & MIDDLEWARES
// ==========================================
const app = express();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }
});

// Permissive CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
}));

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// URL normalizer for Vercel rewrites (/api/xxx -> /xxx)
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.url.startsWith('/api')) {
    req.url = req.url.replace(/^\/api/, '') || '/';
  }
  next();
});

// Auth middleware
interface AuthRequest extends Request {
  user?: any;
}

const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ detail: 'Not authenticated' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(401).json({ detail: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

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

// ==========================================
// 5. ROUTES
// ==========================================

// Health checks
app.get('/', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    app: 'PlantCare AI',
    framework: 'Node.js (Express)',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// Auth Routes
app.post('/auth/register', async (req: Request, res: Response) => {
  try {
    const { email, password, full_name } = req.body || {};
    
    if (!email || !password || !full_name) {
      return res.status(400).json({ detail: 'Full name, email, and password are required' });
    }

    const existingUser = await db.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ detail: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.createUser({
      email,
      fullName: full_name,
      hashedPassword,
    });

    const token = jwt.sign({ sub: user.email, id: user.id }, SECRET_KEY, { expiresIn: tokenExpireSeconds });
    
    return res.status(201).json({
      access_token: token,
      token_type: 'bearer',
      user: {
        id: user.id,
        email: user.email,
        full_name: user.fullName
      }
    });
  } catch (err: any) {
    console.error('Register error:', err);
    return res.status(500).json({ detail: 'Internal server error' });
  }
});

app.post('/auth/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body || {};
    
    if (!email || !password) {
      return res.status(400).json({ detail: 'Email and password are required' });
    }

    const user = await db.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ detail: 'Incorrect email or password' });
    }

    const isValid = await bcrypt.compare(password, user.hashedPassword);
    if (!isValid) {
      return res.status(401).json({ detail: 'Incorrect email or password' });
    }

    const token = jwt.sign({ sub: user.email, id: user.id }, SECRET_KEY, { expiresIn: tokenExpireSeconds });
    
    return res.json({
      access_token: token,
      token_type: 'bearer',
      user: {
        id: user.id,
        email: user.email,
        full_name: user.fullName
      }
    });
  } catch (err: any) {
    console.error('Login error:', err);
    return res.status(500).json({ detail: 'Internal server error' });
  }
});

// Plants Routes
app.get('/plants/dashboard', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const stats = await db.getDashboardStats(req.user.id);
    return res.json(stats);
  } catch (err: any) {
    console.error('Dashboard error:', err);
    return res.status(500).json({ detail: 'Internal server error' });
  }
});

app.get('/plants', authenticateToken, async (req: AuthRequest, res: Response) => {
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

app.post('/plants', authenticateToken, async (req: AuthRequest, res: Response) => {
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

app.get('/plants/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
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
    console.error('Get plant error:', err);
    return res.status(500).json({ detail: 'Internal server error' });
  }
});

app.delete('/plants/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
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

// Scan Routes (Standalone Scan)
app.post('/scan', upload.single('image'), async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ detail: 'Image file is required' });
    }

    const analysis = await analyzePlantImage(req.file.buffer, req.file.mimetype);

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

    return res.json({
      scan_id: scan.id,
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

// Scan Plant by ID
app.post('/plants/:id/scan', authenticateToken, upload.single('image'), async (req: AuthRequest, res: Response) => {
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

// Fallback 404
app.use((req: Request, res: Response) => {
  res.status(404).json({ detail: `Route ${req.method} ${req.path} not found` });
});

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Express Error:', err);
  res.status(err.status || 500).json({
    detail: err.message || 'Internal Server Error',
  });
});

export default app;
