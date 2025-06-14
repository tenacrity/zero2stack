const API_URL = 'http://localhost:3000';

// DOM Elements
const taskForm = document.getElementById('taskForm');
const tasksContainer = document.getElementById('tasks');

// Fetch all tasks
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

// Display tasks in the UI
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

// Add new task
async function addTask(e) {
    e.preventDefault();
    
    const text = document.getElementById('text').value;
    
    try {
        const response = await fetch(`${API_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
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

// Delete task
async function deleteTask(id) {
    try {
        const response = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        
        if (data.success) {
            fetchTasks();
        }
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}

// Event Listeners
taskForm.addEventListener('submit', addTask);

// Initial load
fetchTasks(); 