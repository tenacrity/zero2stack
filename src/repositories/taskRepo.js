// src/repositories/taskRepo.js

import { Task } from '../models/index.js';

/**
 * Task Repository
 * This module provides functions to interact with the Task model.
 * It includes methods to get all tasks, create a task, remove a task,
 * get a task by ID, and update a task.
 */

export const getAll = () => Task.findAll();

export const create = (data) => Task.create(data);

export const remove = (id) => Task.destroy({ where: { id } });

export const getById = (id) => Task.findByPk(id);

export const update = async (id, data) => {
  const [count, [updatedTask]] = await Task.update(data, {
    where: { id },
    returning: true, // important to get the updated row back
  });

  if (count === 0) {
    return null; // nothing updated
  }

  return updatedTask;
};
