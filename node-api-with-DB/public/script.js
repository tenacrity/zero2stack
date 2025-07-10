
console.log('script loaded');
const API_URL ='http://localhost:3000';

//DOM elements
const taskForm = document.getElementById('task-form');
const taskContainer = document.getElementById('tasksList');

//Fetch all tasks
async function fetchTasks() {
     console.log('inside fetch tasks method');
    try {
        const response = await fetch(`${API_URL}/tasks`);
         console.log('inside fetch response', response);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data= await response.json();
        console.log('DATA inside fetch:', data);
        if(data.success){
            console.log('inside fetch tasks methos:', data.data);
            displayTasks(data.data);
        }
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

// Display tasks in the UI
function displayTasks(tasks) {
     console.log('Rendering tasks:', tasks);
     console.log('taskContainer:', taskContainer);
    taskContainer.innerHTML = '';
    
    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = 'task';
       taskElement.innerHTML = `
    <div class="task-content">
        <p>${task.text}</p>
        <small>Created: ${new Date(task.created_at).toLocaleString()}</small>
    </div>
    <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
     `;
        taskContainer.appendChild(taskElement);
    });
}

// Add new task
//browser automatically provides the event object (e) when the form is submitted.
async function addTask(e) {
    // Prevent default form submission like full page reload
    e.preventDefault();
     console.log('Inside ADDTASK function:');
    const text = document.getElementById('taskText').value;
      console.log('Text added is:',text);
    try {
        // sending post method request to the server
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