// src/services/taskService.js
import { v4 as uuidv4 } from 'uuid';
import * as taskRepo from '../repositories/taskRepo.js';
console.log('✅ taskRepo module loaded successfully');
export const getAllTasks = async () => {
  return await taskRepo.getAll();
};

export const createTask = async (taskData) => {
  const task = {
    id: uuidv4(),
    title: taskData.title,
    description: taskData.description
  };
  return await taskRepo.create(task);
};

export const deleteTask = async (id) => {
  const existingTask = await taskRepo.getById(id);
  if (!existingTask) {
    throw new Error('Task not found');
  }
  return await taskRepo.remove(id);
};

export const updateTask = async (id, updateData) => {
   const [count, [updatedTask]] = await taskRepo.update(id, updateData);
  if (count === 0) {
    throw new Error('Task not found or update failed');
  }
  return updatedTask;
};
