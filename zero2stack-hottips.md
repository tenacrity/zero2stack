# Python API Development Best Practices and Key Concepts

## Table of Contents
1. [Project Structure](#project-structure)
2. [FastAPI Framework](#fastapi-framework)
3. [Type Hints and Pydantic](#type-hints-and-pydantic)
4. [Async Programming](#async-programming)
5. [Error Handling](#error-handling)
6. [Testing](#testing)
7. [Security](#security)
8. [Performance](#performance)
9. [Code Organization](#code-organization)
10. [Common Pitfalls](#common-pitfalls)

## Project Structure

### ✅ Good Practices
```python
project/
├── app/
│   ├── api/
│   │   └── v1/
│   │       └── endpoints/
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   └── security.py
│   │   ├── db/
│   │   ├── models/
│   │   ├── schemas/
│   │   └── services/
│   ├── tests/
│   └── main.py
```

- Separate business logic from API routes
- Use versioning for API endpoints (e.g., `/api/v1/`)
- Keep configuration in a dedicated module
- Use services layer for complex business logic

### ❌ Avoid
- Putting all code in a single file
- Mixing database models with API schemas
- Hardcoding configuration values
- Placing business logic in route handlers

## FastAPI Framework

### ✅ Good Practices
```python
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="My API",
    description="API Description",
    version="1.0.0"
)

# Configure CORS properly
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://trusted-domain.com"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)
```

- Use dependency injection for reusable components
- Configure CORS properly for security
- Use proper HTTP status codes
- Document your API with proper descriptions

### ❌ Avoid
- Using `*` for CORS origins in production
- Returning raw database models
- Not handling exceptions properly
- Not validating input data

## Type Hints and Pydantic

### ✅ Good Practices
```python
from pydantic import BaseModel, Field
from typing import Optional, List

class TaskBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=100)
    description: Optional[str] = Field(None, max_length=1000)
    tags: List[str] = Field(default_factory=list)

    class Config:
        from_attributes = True
```

- Use Pydantic models for request/response validation
- Add proper field constraints
- Use type hints consistently
- Document model fields

### ❌ Avoid
- Using `Any` type unless absolutely necessary
- Not validating input data
- Mixing Pydantic models with database models
- Not using proper field constraints

## Async Programming

### ✅ Good Practices
```python
from fastapi import FastAPI
from typing import List

app = FastAPI()

@app.get("/items/")
async def read_items() -> List[Item]:
    # Use async database operations
    items = await db.fetch_all(query)
    return items
```

- Use async/await for I/O operations
- Keep CPU-bound operations synchronous
- Use proper async database drivers
- Handle async errors properly

### ❌ Avoid
- Blocking the event loop with CPU-bound operations
- Not using proper async context managers
- Mixing sync and async code without proper handling
- Not handling async errors properly

## Error Handling

### ✅ Good Practices
```python
from fastapi import HTTPException
from fastapi.responses import JSONResponse

@app.exception_handler(CustomException)
async def custom_exception_handler(request: Request, exc: CustomException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail}
    )

# In route handlers
@app.get("/items/{item_id}")
async def read_item(item_id: int):
    if not item:
        raise HTTPException(
            status_code=404,
            detail="Item not found"
        )
```

- Use custom exception handlers
- Return proper HTTP status codes
- Provide meaningful error messages
- Log errors appropriately

### ❌ Avoid
- Catching all exceptions with bare `except`
- Not logging errors
- Returning 500 for client errors
- Exposing sensitive information in errors

## Testing

### ✅ Good Practices
```python
from fastapi.testclient import TestClient
import pytest

def test_create_item():
    response = client.post(
        "/items/",
        json={"title": "Test Item"}
    )
    assert response.status_code == 201
    assert response.json()["title"] == "Test Item"

@pytest.mark.asyncio
async def test_async_operation():
    result = await async_function()
    assert result is not None
```

- Write unit tests for business logic
- Use pytest fixtures for setup
- Test both success and error cases
- Use async test client for async endpoints

### ❌ Avoid
- Not testing error cases
- Not cleaning up test data
- Not using proper test isolation
- Not testing edge cases

## Security

### ✅ Good Practices
```python
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

async def get_current_user(
    token: str = Depends(oauth2_scheme)
) -> User:
    try:
        payload = jwt.decode(
            token, 
            SECRET_KEY, 
            algorithms=[ALGORITHM]
        )
        return await get_user(payload["sub"])
    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Invalid authentication"
        )
```

- Use proper authentication
- Implement rate limiting
- Validate all input data
- Use secure headers

### ❌ Avoid
- Storing secrets in code
- Not validating user input
- Not using proper authentication
- Not implementing rate limiting

## Performance

### ✅ Good Practices
```python
from fastapi import FastAPI
from fastapi.middleware.gzip import GZipMiddleware

app = FastAPI()
app.add_middleware(GZipMiddleware, minimum_size=1000)

# Use connection pooling
from databases import Database

database = Database(DATABASE_URL)
```

- Use connection pooling
- Implement caching where appropriate
- Use proper indexing
- Optimize database queries

### ❌ Avoid
- Not using connection pooling
- N+1 query problems
- Not implementing caching
- Not optimizing database queries

## Code Organization

### ✅ Good Practices
```python
# services/task_service.py
class TaskService:
    def __init__(self, db: Database):
        self.db = db

    async def create_task(self, task: TaskCreate) -> Task:
        # Business logic here
        pass

# api/v1/endpoints/tasks.py
@router.post("/", response_model=Task)
async def create_task(
    task: TaskCreate,
    task_service: TaskService = Depends(get_task_service)
):
    return await task_service.create_task(task)
```

- Use dependency injection
- Separate concerns
- Use services for business logic
- Keep routes thin

### ❌ Avoid
- Putting business logic in routes
- Not using dependency injection
- Not separating concerns
- Not using proper abstractions

## Common Pitfalls

### 1. Database Operations
❌ Bad:
```python
@app.get("/items/")
async def get_items():
    items = db.query(Item).all()  # Blocking operation
    return items
```

✅ Good:
```python
@app.get("/items/")
async def get_items():
    items = await db.fetch_all(query)  # Async operation
    return items
```

### 2. Error Handling
❌ Bad:
```python
@app.get("/items/{item_id}")
async def get_item(item_id: int):
    try:
        item = db.get(item_id)
        return item
    except:
        return {"error": "Something went wrong"}
```

✅ Good:
```python
@app.get("/items/{item_id}")
async def get_item(item_id: int):
    try:
        item = await db.get(item_id)
        if not item:
            raise HTTPException(status_code=404, detail="Item not found")
        return item
    except DatabaseError as e:
        logger.error(f"Database error: {e}")
        raise HTTPException(status_code=500, detail="Database error")
```

### 3. Input Validation
❌ Bad:
```python
@app.post("/items/")
async def create_item(item: dict):
    if not item.get("name"):
        return {"error": "Name is required"}
    return db.create(item)
```

✅ Good:
```python
class ItemCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    description: Optional[str] = Field(None, max_length=1000)

@app.post("/items/", response_model=Item)
async def create_item(item: ItemCreate):
    return await db.create(item.dict())
```

### 4. Configuration Management
❌ Bad:
```python
DATABASE_URL = "postgresql://user:pass@localhost/db"
SECRET_KEY = "my-secret-key"
```

✅ Good:
```python
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str
    secret_key: str

    class Config:
        env_file = ".env"

settings = Settings()
```

## Best Practices Summary

1. **Project Structure**
   - Use a modular, maintainable structure
   - Separate concerns properly
   - Use proper package management

2. **Code Quality**
   - Use type hints consistently
   - Follow PEP 8 style guide
   - Write comprehensive tests
   - Use proper documentation

3. **Performance**
   - Use async/await properly
   - Implement caching
   - Optimize database queries
   - Use connection pooling

4. **Security**
   - Validate all input
   - Use proper authentication
   - Implement rate limiting
   - Use secure headers

5. **Maintainability**
   - Write clean, readable code
   - Use proper abstractions
   - Follow SOLID principles
   - Document your code

Remember: The goal is to write maintainable, secure, and performant code that's easy to understand and modify. Always consider the long-term implications of your design decisions. 