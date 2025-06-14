import express from 'express';
import { tasksController } from '../controllers/tasksController.js';

const router = express.Router();

// GET /tasks - Get all tasks
router.get('/', tasksController.getTasks);

// POST /tasks - Create a new task
router.post('/', tasksController.addTask);

// DELETE /tasks/:id - Delete a task
router.delete('/:id', tasksController.deleteTask);

export default router; 