// src/models/index.js
import { Sequelize } from 'sequelize';
import { dbConfig } from '../config/index.js';
import { defineTaskModel } from './task.js';

export const sequelize = new Sequelize(
  dbConfig.name,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: 'postgres',
    logging: false,
  }
);

// Define and export the Task model
export const Task = defineTaskModel(sequelize);

export const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
};
