// server.js
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { taskModel } from './models/taskModel.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Enable __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/tasks', async (req, res, next) => {
  try {
    const tasks = await taskModel.getAll();
    res.json({ success: true, data: tasks });
  } catch (err) {
    next(err);
  }
});

app.post('/tasks', async (req, res, next) => {
  try {
    const { title } = req.body;

    // Debug log — can be removed later
    console.log('Received POST /tasks:', req.body);

    // ✅ Validation: prevent null/undefined/empty strings
    if (!title || typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Task title is required and must be a non-empty string.',
      });
    }

    const task = await taskModel.create(title.trim());
    res.status(201).json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
});

app.delete('/tasks/:id', async (req, res, next) => {
  try {
    await taskModel.delete(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

// Global error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
