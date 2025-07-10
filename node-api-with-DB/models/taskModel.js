// models/taskModel.js
import { pool } from '../db.js';

export const taskModel = {
  // 1️⃣ Get all tasks
  getAll: async () => {
    const result = await pool.query(
      'SELECT id, text, done, created_at FROM tasks ORDER BY created_at DESC'
    );
    return result.rows;
  },

  // 2️⃣ Get task by ID
  getById: async (id) => {
    const result = await pool.query(
      'SELECT id, text, done, created_at FROM tasks WHERE id = $1',
      [id]
    );
    return result.rows[0];
  },

  // 3️⃣ Create new task
  create: async (text) => {
    const result = await pool.query(
      'INSERT INTO tasks (text) VALUES ($1) RETURNING id, text, done, created_at',
      [text]
    );
    return result.rows[0];
  },

  // 4️⃣ Delete a task
  delete: async (id) => {
    const result = await pool.query(
      'DELETE FROM tasks WHERE id = $1 RETURNING id',
      [id]
    );
    return result.rowCount > 0;
  },
};
