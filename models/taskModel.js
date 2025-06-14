/**
 * In-memory task storage
 */
let tasks = [];
let nextId = 1;

class Task {
  constructor(text) {
    this.id = nextId++;
    this.text = text;
    this.done = false;
    this.createdAt = new Date();
  }
}

export const taskModel = {
  getAll: () => [...tasks],
  
  getById: (id) => tasks.find(task => task.id === id),
  
  create: (text) => {
    const task = new Task(text);
    tasks.push(task);
    return task;
  },
  
  delete: (id) => {
    const index = tasks.findIndex(task => task.id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    return true;
  }
}; 