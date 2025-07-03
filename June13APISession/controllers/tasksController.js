import { taskModel } from '../models/taskModel.js';
export const tasksController = {
  getTasks: async (req, res, next) => {
    try {
      console.log('🔍 GET /tasks called');
      const tasks = await taskModel.getAll();
      res.json({ success: true, data: tasks });
    } catch (error) {
      console.error('❌ Error in getTasks:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
      next(error);
    }
  },

  addTask: async (req, res, next) => {
    try {
      console.log('Incoming body:', req.body);
      const { text } = req.body;
      if (!text) {
         console.log('⚠️ No text received');
        return res.status(400).json({ success: false, error: 'Text is required' });
      }
      const task = await taskModel.create(text);
      console.log('✅ Task created:', task);
      res.status(201).json({ success: true, data: task });
    } catch (error) {
       console.error('addTask error:', error);
       res.status(500).json({ success: false, error: 'Server error' });
      next(error);
    }
  },

  deleteTask: async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await taskModel.delete(id);
      if (!deleted) {
        return res.status(404).json({ success: false, error: 'Task not found' });
      }
      res.json({ success: true, message: 'Task deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
};
