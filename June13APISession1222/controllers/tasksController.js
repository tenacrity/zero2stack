// controllers/tasksController.js
import { taskModel } from '../models/taskModel.js';

// GET /api/tasks - Fetch all tasks
export async function getTasks(req, res, next) {
  try {
    const tasks = await taskModel.getAll();
    res.json({ success: true, data: tasks });
  } catch (error) {
    console.error('❌ Error fetching tasks:', error);
    next(error);
  }
}

// POST /api/tasks - Add a new task
export async function addTask(req, res, next) {
  try {
    const { title, text, completed } = req.body;
    const taskTitle = title || text;

    if (!taskTitle || taskTitle.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Task title or text is required',
      });
    }

    const newTask = await taskModel.create(taskTitle, completed || false);
    res.status(201).json({ success: true, data: newTask });
  } catch (error) {
    console.error('❌ Error adding task:', error);
    next(error);
  }
}

// DELETE /api/tasks/:id - Delete a task by ID
export async function deleteTask(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.status(400).json({ success: false, error: 'Invalid task ID' });
    }

    const deleted = await taskModel.delete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }

    res.json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting task:', error);
    next(error);
  }
}
