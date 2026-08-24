import app from './app';
import { connectDB } from './db';

const PORT = process.env.PORT || 8000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`PlantCare AI Node.js Backend listening on port ${PORT}`);
  });
});
