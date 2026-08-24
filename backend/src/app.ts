import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import plantsRoutes from './routes/plants';
import scansRoutes from './routes/scans';
// Import other routes later

const app = express();

app.use(cors());
app.use(express.json());

// Register API routes
app.use('/auth', authRoutes);
app.use('/plants', plantsRoutes);
app.use('/scan', scansRoutes);
// app.use('/sensors', sensorsRoutes);

app.get('/', (req, res) => {
  res.json({
    status: 'healthy',
    app: 'PlantCare AI',
    message: 'PlantCare Node.js backend is running!',
  });
});

export default app;
