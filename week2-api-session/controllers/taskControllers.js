import { taskModel } from "../models/taskModel.js";
export const taskControllers = {
    //getting task by id
    getAll: (req, res) => {
        const tasks = taskModel.getAll();
         res.json({ success: true, data: tasks });
    },
//adding new task
    addTask: (req, res, next) => {
        try {
            const { text } = req.body;
            if (!text) {
                return res.status(400).json({ success: false, message: 'Invalid task text' });
            }
            const newTask = taskModel.create(text);
            res.status(201).json({ success: true, task: newTask });
        } catch (error) {
            next(error);
        }

    },
//deleting task by id
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