// routes/tasks.js
import express from 'express';
import { tasksController } from '../controllers/tasksController.js';

const router = express.Router();

router.get('/', tasksController.getTasks);
router.post('/', tasksController.addTask);
router.delete('/:id', tasksController.deleteTask);

export default router;