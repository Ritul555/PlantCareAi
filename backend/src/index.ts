import app from './app';

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`PlantCare AI Node.js Backend listening on port ${PORT}`);
});
