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