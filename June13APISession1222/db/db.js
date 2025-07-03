// db/db.js
import dotenv from 'dotenv';
dotenv.config(); // Load .env variables

import pkg from 'pg';
const { Pool } = pkg;

// ✅ Add this to verify your DB URL is correctly loaded
console.log("🔍 DATABASE_URL:", process.env.DATABASE_URL);

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
