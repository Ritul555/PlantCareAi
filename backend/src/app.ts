import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import plantsRoutes from './routes/plants';
import scansRoutes from './routes/scans';

const app = express();

// Permissive CORS for mobile app & web clients
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
}));

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Root health check endpoint
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

// Register API routes
app.use('/auth', authRoutes);
app.use('/plants', plantsRoutes);
app.use('/scan', scansRoutes);

// Fallback for 404
app.use((req: Request, res: Response) => {
  res.status(404).json({ detail: `Route ${req.method} ${req.path} not found` });
});

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({
    detail: err.message || 'Internal Server Error',
  });
});

export default app;
