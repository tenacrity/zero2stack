import { Sequelize } from 'sequelize';
import { dbConfig } from '../config/index.js';
import TaskModel from './task.js'; // Correct import

export const sequelize = new Sequelize(
  dbConfig.name,
  dbConfig.user,
  dbConfig.pass,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect || 'postgres',
    logging: false,
  }
);

// Initialize models
export const Task = TaskModel(sequelize, Sequelize.DataTypes);

// Test DB connection
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection has been established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
};
// Export models