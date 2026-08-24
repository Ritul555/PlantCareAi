import app from '../src/app';
import { connectDB } from '../src/db';

// Connect to DB for serverless environments
connectDB();

export default app;
