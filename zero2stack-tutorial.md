# Building a RESTful API with Node.js and Express: A Step-by-Step Tutorial

Welcome to this hands-on tutorial! In the next 1.15 hours, we'll build a complete RESTful API for a simple task manager. We'll cover Node.js, Express, RESTful principles, and CRUD operations. Let's dive in!

---

## Prerequisites
- Node.js (v14 or higher) and npm installed
- Basic understanding of JavaScript
- A code editor (like VS Code)

---

## Step 1: Project Setup (5 minutes)

### 1.1 Create the Project Directory
```bash
mkdir june13-api-session
cd june13-api-session
```

### 1.2 Initialize the Project
```bash
npm init -y
```

### 1.3 Install Dependencies
```bash
npm install express dotenv cors morgan
npm install --save-dev nodemon jest supertest
```

### 1.4 Update `package.json`
Add the following scripts:
```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js",
  "test": "jest"
}
```

### 1.5 Create a `.env` File
```
PORT=3000
NODE_ENV=development
```

### 1.6 Create a `.gitignore` File
```
node_modules/
.env
```

---

## Step 2: Setting Up the Express Server (10 minutes)

### 2.1 Create `server.js`
This is the entry point of our application. We'll set up Express, middleware, and routes.

```js
// server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './middleware/logger.js';
import tasksRouter from './routes/tasks.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(logger);

// Routes
app.use('/tasks', tasksRouter);

// Error handling
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

### 2.2 Key Concepts Introduced:
- **Express**: A fast, unopinionated, minimalist web framework for Node.js.
- **Middleware**: Functions that have access to the request and response objects. They can execute code, modify the request/response, and end the request-response cycle.
- **Environment Variables**: Using `dotenv` to manage configuration.

---

## Step 3: Creating Middleware (10 minutes)

### 3.1 Error Handling Middleware (`middleware/errorHandler.js`)
This middleware catches errors and sends a consistent JSON response.

```js
// middleware/errorHandler.js
export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  const status = err.statusCode || 500;
  const message = err.message || 'Something went wrong!';
  res.status(status).json({ success: false, error: message });
};
```

### 3.2 Logging Middleware (`middleware/logger.js`)
This middleware logs each request's method, URL, status code, and response time.

```js
// middleware/logger.js
export const logger = (req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
  });
  next();
};
```

### 3.3 Key Concepts Introduced:
- **Error Handling**: Centralizing error responses for consistency.
- **Logging**: Observability and debugging.

---

## Step 4: Building the Task Model (10 minutes)

### 4.1 Create `models/taskModel.js`
This file manages an in-memory array of tasks.

```js
// models/taskModel.js
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
```

### 4.2 Key Concepts Introduced:
- **In-Memory Data Store**: Simulating a database with an array.
- **ES Modules**: Using `export` to share functionality.

---

## Step 5: Implementing the Task Controller (15 minutes)

### 5.1 Create `controllers/tasksController.js`
This file contains the business logic for handling task-related requests.

```js
// controllers/tasksController.js
import { taskModel } from '../models/taskModel.js';

export const tasksController = {
  getTasks: (req, res, next) => {
    try {
      const tasks = taskModel.getAll();
      res.json({ success: true, data: tasks });
    } catch (error) {
      next(error);
    }
  },

  addTask: (req, res, next) => {
    try {
      const { text } = req.body;
      if (!text) {
        return res.status(400).json({ success: false, error: 'Text is required' });
      }
      const task = taskModel.create(text);
      res.status(201).json({ success: true, data: task });
    } catch (error) {
      next(error);
    }
  },

  deleteTask: (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = taskModel.delete(id);
      if (!deleted) {
        return res.status(404).json({ success: false, error: 'Task not found' });
      }
      res.json({ success: true, message: 'Task deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
};
```

### 5.2 Key Concepts Introduced:
- **Controllers**: Separating business logic from routing.
- **Input Validation**: Checking for required fields.
- **HTTP Status Codes**: Using appropriate status codes (201, 400, 404).

---

## Step 6: Defining Routes (10 minutes)

### 6.1 Create `routes/tasks.js`
This file defines the API endpoints for tasks.

```js
// routes/tasks.js
import express from 'express';
import { tasksController } from '../controllers/tasksController.js';

const router = express.Router();

router.get('/', tasksController.getTasks);
router.post('/', tasksController.addTask);
router.delete('/:id', tasksController.deleteTask);

export default router;
```

### 6.2 Key Concepts Introduced:
- **RESTful Routing**: Using HTTP methods to perform CRUD operations.
- **Express Router**: Modular routing.

---

## Step 7: Testing the API (15 minutes)

### 7.1 Create `tests/tasks.test.js`
This file contains unit and integration tests for the API.

```js
// tests/tasks.test.js
import request from 'supertest';
import express from 'express';
import tasksRouter from '../routes/tasks.js';

const app = express();
app.use(express.json());
app.use('/tasks', tasksRouter);

describe('Task API', () => {
  let taskId;

  test('POST /tasks - Create a new task', async () => {
    const response = await request(app)
      .post('/tasks')
      .send({ text: 'Test Task' });
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    taskId = response.body.data.id;
  });

  test('GET /tasks - Get all tasks', async () => {
    const response = await request(app).get('/tasks');
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test('DELETE /tasks/:id - Delete a task', async () => {
    const response = await request(app).delete(`/tasks/${taskId}`);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
```

### 7.2 Key Concepts Introduced:
- **Automated Testing**: Using Jest and Supertest for API testing.
- **Test-Driven Development (TDD)**: Writing tests before implementation.

---

## Step 8: Building a Simple Frontend (10 minutes)

### 8.1 Create `public/index.html`
A minimal UI for interacting with the API.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Manager</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>Task Manager</h1>
        <form id="taskForm">
            <input type="text" id="text" placeholder="Enter task text" required>
            <button type="submit">Add Task</button>
        </form>
        <div id="taskList">
            <h2>Tasks</h2>
            <div id="tasks"></div>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>
```

### 8.2 Create `public/script.js`
JavaScript for interacting with the API.

```js
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
```

### 8.3 Key Concepts Introduced:
- **Frontend-Backend Integration**: Using `fetch` to interact with the API.
- **DOM Manipulation**: Dynamically updating the UI.

---

## Step 9: Styling the Frontend (5 minutes)

### 9.1 Create `public/styles.css`
Basic styling for the task manager.

```css
/* public/styles.css */
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    background-color: #f4f4f4;
}

.container {
    max-width: 800px;
    margin: 2rem auto;
    padding: 1rem;
}

h1 {
    text-align: center;
    color: #333;
    margin-bottom: 2rem;
}

form {
    background: white;
    padding: 1rem;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    margin-bottom: 2rem;
}

input, textarea {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid #ddd;
    border-radius: 3px;
}

button {
    background: #333;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}

button:hover {
    background: #444;
}

.task {
    background: white;
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.delete-btn {
    background: #dc3545;
    margin-left: 1rem;
}

.delete-btn:hover {
    background: #c82333;
}
```

### 9.2 Key Concepts Introduced:
- **CSS Styling**: Basic layout and design principles.

---

## Step 10: Running the Application (5 minutes)

### 10.1 Start the Server
```bash
npm run dev
```

### 10.2 Access the Frontend
Open `http://localhost:3000/public/index.html` in your browser.

### 10.3 Key Concepts Introduced:
- **Development Workflow**: Using `nodemon` for auto-reloading.

---

## Conclusion
Congratulations! You've built a complete RESTful API with Node.js and Express. You've learned about:
- Project setup and dependency management
- Express server and middleware
- RESTful routing and CRUD operations
- Error handling and logging
- Frontend-backend integration
- Testing and styling

Keep experimenting, refactoring, and learning. Happy coding!

---

> **Next Steps:**
> - Add more features (e.g., task completion, filtering)
> - Integrate a real database (e.g., MongoDB, PostgreSQL)
> - Deploy your API (e.g., Heroku, AWS) 