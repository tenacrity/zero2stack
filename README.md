# Building a RESTful API with Python and FastAPI: A Step-by-Step Tutorial

Welcome to this hands-on tutorial! In the next 1.15 hours, we'll build a complete RESTful API for a simple task manager. We'll cover Python, FastAPI, RESTful principles, and CRUD operations. Let's dive in!

---

## Prerequisites
- Python 3.8 or higher
- Basic understanding of Python
- A code editor (like VS Code)

---

## Step 1: Project Setup (5 minutes)

### 1.1 Create the Project Directory
```bash
mkdir python-api-session
cd python-api-session
```

### 1.2 Create a Virtual Environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 1.3 Install Dependencies
```bash
pip install fastapi uvicorn python-dotenv pydantic pytest httpx
```

### 1.4 Create `requirements.txt`
```bash
pip freeze > requirements.txt
```

### 1.5 Create a `.env` File
```
PORT=8000
ENV=development
```

### 1.6 Create a `.gitignore` File
```
venv/
__pycache__/
*.pyc
.env
```

---

## Step 2: Setting Up the FastAPI Server (10 minutes)

### 2.1 Create `main.py`
This is the entry point of our application. We'll set up FastAPI, middleware, and routes.

```python
# main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
import uvicorn
import os

from routers import tasks
from middleware.logger import logger_middleware

# Load environment variables
load_dotenv()

app = FastAPI(title="Task Manager API")

# Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.middleware("http")(logger_middleware)

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Include routers
app.include_router(tasks.router, prefix="/tasks", tags=["tasks"])

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
```

### 2.2 Key Concepts Introduced:
- **FastAPI**: A modern, fast web framework for building APIs with Python
- **Middleware**: Functions that process requests and responses
- **Environment Variables**: Using `python-dotenv` to manage configuration

---

## Step 3: Creating Middleware (10 minutes)

### 3.1 Error Handling Middleware (`middleware/error_handler.py`)
This middleware catches errors and sends a consistent JSON response.

```python
# middleware/error_handler.py
from fastapi import Request, status
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError

async def error_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"success": False, "error": str(exc)}
    )

async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={"success": False, "error": str(exc)}
    )
```

### 3.2 Logging Middleware (`middleware/logger.py`)
This middleware logs each request's method, URL, status code, and response time.

```python
# middleware/logger.py
import time
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware

async def logger_middleware(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    print(f"{request.method} {request.url.path} {response.status_code} - {process_time:.2f}s")
    return response
```

### 3.3 Key Concepts Introduced:
- **Error Handling**: Centralizing error responses for consistency
- **Logging**: Observability and debugging

---

## Step 4: Building the Task Model (10 minutes)

### 4.1 Create `models/task.py`
This file defines the Task model using Pydantic.

```python
# models/task.py
from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class TaskBase(BaseModel):
    text: str

class TaskCreate(TaskBase):
    pass

class Task(TaskBase):
    id: int
    done: bool = False
    created_at: datetime = datetime.now()

    class Config:
        from_attributes = True
```

### 4.2 Create `models/task_store.py`
This file manages an in-memory list of tasks.

```python
# models/task_store.py
from typing import List, Optional
from .task import Task

class TaskStore:
    def __init__(self):
        self.tasks: List[Task] = []
        self.next_id: int = 1

    def get_all(self) -> List[Task]:
        return self.tasks.copy()

    def get_by_id(self, task_id: int) -> Optional[Task]:
        return next((task for task in self.tasks if task.id == task_id), None)

    def create(self, text: str) -> Task:
        task = Task(id=self.next_id, text=text)
        self.next_id += 1
        self.tasks.append(task)
        return task

    def delete(self, task_id: int) -> bool:
        task = self.get_by_id(task_id)
        if task:
            self.tasks.remove(task)
            return True
        return False

# Create a singleton instance
task_store = TaskStore()
```

### 4.3 Key Concepts Introduced:
- **Pydantic Models**: Data validation and serialization
- **Type Hints**: Python's type annotation system
- **Singleton Pattern**: Managing global state

---

## Step 5: Implementing the Task Router (15 minutes)

### 5.1 Create `routers/tasks.py`
This file contains the route handlers for task-related endpoints.

```python
# routers/tasks.py
from fastapi import APIRouter, HTTPException
from typing import List
from models.task import Task, TaskCreate
from models.task_store import task_store

router = APIRouter()

@router.get("/", response_model=List[Task])
async def get_tasks():
    return task_store.get_all()

@router.post("/", response_model=Task, status_code=201)
async def create_task(task: TaskCreate):
    return task_store.create(task.text)

@router.delete("/{task_id}")
async def delete_task(task_id: int):
    if not task_store.delete(task_id):
        raise HTTPException(status_code=404, detail="Task not found")
    return {"success": True, "message": "Task deleted successfully"}
```

### 5.2 Key Concepts Introduced:
- **FastAPI Routers**: Modular routing
- **Dependency Injection**: FastAPI's dependency system
- **Response Models**: Automatic response validation

---

## Step 6: Testing the API (15 minutes)

### 6.1 Create `tests/test_tasks.py`
This file contains unit and integration tests for the API.

```python
# tests/test_tasks.py
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_create_task():
    response = client.post("/tasks/", json={"text": "Test Task"})
    assert response.status_code == 201
    assert response.json()["text"] == "Test Task"
    assert "id" in response.json()

def test_get_tasks():
    response = client.get("/tasks/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_delete_task():
    # First create a task
    create_response = client.post("/tasks/", json={"text": "Task to Delete"})
    task_id = create_response.json()["id"]
    
    # Then delete it
    delete_response = client.delete(f"/tasks/{task_id}")
    assert delete_response.status_code == 200
    assert delete_response.json()["success"] is True
```

### 6.2 Key Concepts Introduced:
- **TestClient**: FastAPI's testing utilities
- **Pytest**: Python's testing framework
- **Test-Driven Development (TDD)**: Writing tests before implementation

---

## Step 7: Building a Simple Frontend (10 minutes)

### 7.1 Create `static/index.html`
A minimal UI for interacting with the API.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Manager</title>
    <link rel="stylesheet" href="/static/styles.css">
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
    <script src="/static/script.js"></script>
</body>
</html>
```

### 7.2 Create `static/script.js`
JavaScript for interacting with the API.

```javascript
// static/script.js
const API_URL = 'http://localhost:8000';

async function fetchTasks() {
    try {
        const response = await fetch(`${API_URL}/tasks`);
        const tasks = await response.json();
        displayTasks(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

function displayTasks(tasks) {
    const tasksContainer = document.getElementById('tasks');
    tasksContainer.innerHTML = '';
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
        if (response.ok) {
            document.getElementById('taskForm').reset();
            fetchTasks();
        }
    } catch (error) {
        console.error('Error adding task:', error);
    }
}

async function deleteTask(id) {
    try {
        const response = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            fetchTasks();
        }
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}

document.getElementById('taskForm').addEventListener('submit', addTask);
fetchTasks();
```

### 7.3 Create `static/styles.css`
Basic styling for the task manager.

```css
/* static/styles.css */
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

input {
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

### 7.4 Key Concepts Introduced:
- **Static File Serving**: FastAPI's static file handling
- **Frontend-Backend Integration**: Using `fetch` to interact with the API
- **DOM Manipulation**: Dynamically updating the UI

---

## Step 8: Running the Application (5 minutes)

### 8.1 Start the Server
```bash
uvicorn main:app --reload
```

### 8.2 Access the Frontend
Open `http://localhost:8000/static/index.html` in your browser.

### 8.3 Access the API Documentation
Open `http://localhost:8000/docs` in your browser to see the interactive API documentation.

### 8.4 Key Concepts Introduced:
- **Development Server**: Using `uvicorn` for hot-reloading
- **API Documentation**: FastAPI's automatic OpenAPI documentation

---

## Conclusion
Congratulations! You've built a complete RESTful API with Python and FastAPI. You've learned about:
- Project setup and dependency management
- FastAPI server and middleware
- RESTful routing and CRUD operations
- Error handling and logging
- Frontend-backend integration
- Testing and styling

Keep experimenting, refactoring, and learning. Happy coding!

---

> **Next Steps:**
> - Add more features (e.g., task completion, filtering)
> - Integrate a real database (e.g., SQLAlchemy with PostgreSQL)
> - Add authentication and authorization
> - Deploy your API (e.g., Heroku, AWS)
