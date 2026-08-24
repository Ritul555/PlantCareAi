import { Sequelize, DataTypes } from 'sequelize';

const isVercel = process.env.VERCEL === '1';
// On Vercel we use /tmp to have a writable DB
const dbPath = isVercel ? '/tmp/plantcare_dev.db' : './plantcare_dev.db';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: false,
});

export const User = sequelize.define('User', {
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  fullName: { type: DataTypes.STRING, allowNull: false },
  hashedPassword: { type: DataTypes.STRING, allowNull: false },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
});

export const Plant = sequelize.define('Plant', {
  name: { type: DataTypes.STRING, allowNull: false },
  plantType: { type: DataTypes.STRING },
  scientificName: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT },
  location: { type: DataTypes.STRING },
  category: { type: DataTypes.STRING },
  currentStatus: { type: DataTypes.STRING, defaultValue: 'unknown' },
  imageUrl: { type: DataTypes.STRING }
});

export const PlantScan = sequelize.define('PlantScan', {
  imagePath: { type: DataTypes.STRING },
  scanType: { type: DataTypes.STRING, defaultValue: 'quick_scan' },
  healthScore: { type: DataTypes.FLOAT },
  healthStatus: { type: DataTypes.STRING },
  identifiedPlantType: { type: DataTypes.STRING },
  identificationConfidence: { type: DataTypes.FLOAT },
  detectedDisease: { type: DataTypes.STRING },
  diseaseConfidence: { type: DataTypes.FLOAT },
  visualAnalysis: { type: DataTypes.TEXT },
  detectedIssues: { type: DataTypes.TEXT },
  aiExplanation: { type: DataTypes.TEXT },
  overallConfidence: { type: DataTypes.FLOAT }
});

// Relationships
User.hasMany(Plant, { foreignKey: 'userId', onDelete: 'CASCADE' });
Plant.belongsTo(User, { foreignKey: 'userId' });

Plant.hasMany(PlantScan, { foreignKey: 'plantId', onDelete: 'CASCADE' });
PlantScan.belongsTo(Plant, { foreignKey: 'plantId' });

// Function to synchronize the database
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Database synchronized');
  } catch (error) {
    console.error('Database connection failed', error);
  }
};
