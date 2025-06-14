import { taskModel } from '../models/taskModel.js';

export const tasksController = {
  /**
   * Get all tasks
   */
  getTasks: (req, res, next) => {
    try {
      const tasks = taskModel.getAll();
      res.json({ success: true, data: tasks });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Create a new task
   */
  addTask: (req, res, next) => {
    try {
      const { text } = req.body;
      
      if (!text) {
        return res.status(400).json({
          success: false,
          error: 'Text is required'
        });
      }

      const task = taskModel.create(text);
      res.status(201).json({ success: true, data: task });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Delete a task
   */
  deleteTask: (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = taskModel.delete(id);
      
      if (!deleted) {
        return res.status(404).json({
          success: false,
          error: 'Task not found'
        });
      }

      res.json({ success: true, message: 'Task deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}; 