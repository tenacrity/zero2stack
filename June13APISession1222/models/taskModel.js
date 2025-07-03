import { pool } from '../db/db.js';

const useDatabase = process.env.USE_DATABASE === 'true';
console.log(`📦 Using database: ${useDatabase}`);

let tasks = [];
let nextId = 1;

class Task {
  constructor(title, completed = false) {
    this.id = nextId++;
    this.title = title;
    this.completed = completed;
    this.createdAt = new Date();
  }
}

export const taskModel = {
  getAll: async () => {
    if (useDatabase) {
      const result = await pool.query('SELECT * FROM tasks');
      return result.rows;
    } else {
      return [...tasks];
    }
  },

  getById: async (id) => {
    if (useDatabase) {
      const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
      return result.rows[0] || null;
    } else {
      return tasks.find(task => task.id === id) || null;
    }
  },

  create: async (title, completed = false) => {
    if (useDatabase) {
      const result = await pool.query(
        'INSERT INTO tasks (title, completed) VALUES ($1, $2) RETURNING *',
        [title, completed]
      );
      return result.rows[0];
    } else {
      const task = new Task(title, completed);
      tasks.push(task);
      return task;
    }
  },

  delete: async (id) => {
    if (useDatabase) {
      const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
      return result.rowCount > 0;
    } else {
      const index = tasks.findIndex(task => task.id === id);
      if (index === -1) return false;
      tasks.splice(index, 1);
      return true;
    }
  }
};
