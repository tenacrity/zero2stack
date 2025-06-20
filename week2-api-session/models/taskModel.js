let tasks =[];
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
        const newTask = new Task(text);
        tasks.push(newTask);
        return newTask;
    },

    delete: (id) => {
        const index = tasks.findIndex(task => task.id === id);
        if (index === -1) return false;
        tasks.splice(index, 1);
        return true;
    },

}