const API_URL = 'http://localhost:3000/api/tasks';

const taskForm = document.getElementById('taskForm');
const tasksContainer = document.getElementById('tasks');

// Fetch and display all tasks
async function fetchTasks() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    if (data.success) {
      displayTasks(data.data);
    } else {
      console.error('Failed to fetch tasks:', data.error);
    }
  } catch (error) {
    console.error('❌ Error fetching tasks:', error);
  }
}

// Render tasks in the DOM
function displayTasks(tasks) {
  tasksContainer.innerHTML = '';

  tasks.forEach(task => {
    const taskElement = document.createElement('div');
    taskElement.className = 'task';
    taskElement.innerHTML = `
      <div class="task-content">
        <p>${task.title || 'Untitled Task'}</p>
        <small>Created: ${new Date(task.created_at || task.createdAt).toLocaleString()}</small>
      </div>
      <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
    `;
    tasksContainer.appendChild(taskElement);
  });
}

// Add a new task
async function addTask(e) {
  e.preventDefault();
  const textInput = document.getElementById('text');
  const title = textInput.value.trim();

  if (!title) {
    alert('Please enter a task title.');
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }) // ✅ send title only
    });

    const data = await response.json();

    if (data.success) {
      taskForm.reset();
      fetchTasks();
    } else {
      console.error('Failed to add task:', data.error);
    }
  } catch (error) {
    console.error('❌ Error adding task:', error);
  }
}

// Delete a task by ID
async function deleteTask(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });

    const data = await response.json();

    if (data.success) {
      fetchTasks();
    } else {
      console.error('Failed to delete task:', data.error);
    }
  } catch (error) {
    console.error('❌ Error deleting task:', error);
  }
}

taskForm.addEventListener('submit', addTask);
fetchTasks();
