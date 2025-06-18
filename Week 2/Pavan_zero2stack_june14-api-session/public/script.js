// public/script.js
const API_URL = 'http://localhost:3000';
const taskForm = document.getElementById('taskForm');
const tasksContainer = document.getElementById('tasks');

async function fetchTasks() {
    try {
        const response = await fetch(`${API_URL}/tasks`);
        const data = await response.json();
        if (data.success) {
            displayTasks(data.data);
        }
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

function displayTasks(tasks) {
    tasksContainer.innerHTML = '';
    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = 'task';
        taskElement.innerHTML = `
            <div class="task-content">
                <p>${task.text}</p>
                <small>Created: ${new Date(task.createdAt).toLocaleString()}</small>
            </div>
            <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
        `;
        tasksContainer.appendChild(taskElement);
    });
}

async function addTask(e) {
    e.preventDefault();
    const text = document.getElementById('text').value;
    try {
        const response = await fetch(`${API_URL}/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });
        const data = await response.json();
        if (data.success) {
            taskForm.reset();
            fetchTasks();
        }
    } catch (error) {
        console.error('Error adding task:', error);
    }
}

async function deleteTask(id) {
    try {
        const response = await fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' });
        const data = await response.json();
        if (data.success) {
            fetchTasks();
        }
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}

taskForm.addEventListener('submit', addTask);
fetchTasks();