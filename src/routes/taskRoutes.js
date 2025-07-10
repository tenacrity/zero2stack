// src/routes/taskRoutes.js
import express from 'express';
import { body } from 'express-validator';
import * as ctrl from '../controllers/taskController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply authMiddleware only to protected routes
router.get('/', authMiddleware, ctrl.getTasks);

router.post(
  '/',
  authMiddleware,
  [
    body('title').isString().notEmpty().withMessage('Title is required'),
    body('description').optional().isString(),
  ],
  ctrl.createTask
);

router.put(
  '/:id',
  authMiddleware,
  [
    body('title').optional().isString().notEmpty(),
    body('description').optional().isString(),
    body('completed').optional().isBoolean(),
  ],
  ctrl.updateTask
);

router.delete('/:id', authMiddleware, ctrl.deleteTask);

export default router;
