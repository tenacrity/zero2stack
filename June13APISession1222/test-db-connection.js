// test-db-connection.js
import dotenv from 'dotenv';
dotenv.config();

import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function test() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('✅ DB connected at:', res.rows[0]);
  } catch (err) {
    console.error('❌ DB connection failed:', err.message);
  } finally {
    await pool.end();
  }
}

test();
