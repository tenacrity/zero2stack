// test-db.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
console.log('🔍 DB_PASS:', process.env.DB_PASS);
console.log('🔍 typeof DB_PASS:', typeof process.env.DB_PASS);
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS || '',
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
  }
);

try {
  await sequelize.authenticate();
  console.log('✅ Connected to DB!');
} catch (error) {
  console.error('❌ Failed to connect:', error.message);
}
