import express from 'express';
import { taskControllers } from '../controllers/taskControllers.js';

const router = express.Router();

router.get('/', taskControllers.getAll);
router.post('/', taskControllers.addTask);
router.delete('/:id', taskControllers.deleteTask);

export default router