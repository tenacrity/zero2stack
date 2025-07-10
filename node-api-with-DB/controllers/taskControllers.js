import { taskModel } from "../models/taskModel.js";

export const taskControllers = {
  // Getting all tasks
  getAll: async (req, res, next) => {
    try {
      const tasks = await taskModel.getAll();
      res.json({ success: true, data: tasks });
    } catch (error) {
      next(error);
    }
  },

  // Adding new task
  addTask: async (req, res, next) => {
    try {
      const { text } = req.body;
      if (!text) {
        return res.status(400).json({ success: false, message: 'Invalid task text' });
      }

      const newTask = await taskModel.create(text);
      res.status(201).json({ success: true, task: newTask });
    } catch (error) {
      next(error);
    }
  },

  // Deleting task by id
  deleteTask: async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await taskModel.delete(id);

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
