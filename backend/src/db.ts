import fs from 'fs';
import path from 'path';

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

class Database {
  private filePath: string;
  private data: DatabaseSchema;

  constructor() {
    const isVercel = process.env.VERCEL === '1' || process.env.AWS_LAMBDA_FUNCTION_NAME !== undefined;
    this.filePath = isVercel ? '/tmp/plantcare_data.json' : path.join(process.cwd(), 'plantcare_data.json');
    this.data = this.loadData();
  }

  private loadData(): DatabaseSchema {
    try {
      if (fs.existsSync(this.filePath)) {
        const raw = fs.readFileSync(this.filePath, 'utf-8');
        return JSON.parse(raw);
      }
    } catch (e) {
      console.warn('Could not read existing database file, initializing fresh:', e);
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
      console.error('Failed to persist database file:', e);
    }
  }

  // --- User Operations ---
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

  // --- Plant Operations ---
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
      // Also delete plant scans
      this.data.scans = this.data.scans.filter(s => s.plantId !== id);
      this.saveData();
      return true;
    }
    return false;
  }

  // --- Scan Operations ---
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

  // --- Stats / Dashboard ---
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

export const db = new Database();
