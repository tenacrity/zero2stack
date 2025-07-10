// models/taskModel.js
import { pool } from '../db.js';

export const taskModel = {
  getAll: async () => {
    const result = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
    return result.rows;
  },
  create: async (title) => {
    const result = await pool.query(
      'INSERT INTO tasks (title, completed) VALUES ($1, false) RETURNING *',
      [title]
    );
    return result.rows[0];
  },
  delete: async (id) => {
    await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
  },
};
