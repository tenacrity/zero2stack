import pytest

@pytest.mark.asyncio
async def test_create_task(client):
    response = await client.post("/tasks/", json={
        "title": "Test Task",
        "description": "This is a test task",
        "completed": False
    })
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "Test Task"
    assert data["is_completed"] is False  # ✅ Fixed key

@pytest.mark.asyncio
async def test_get_tasks(client):
    await client.post("/tasks/", json={
        "title": "Another Task",
        "description": "Another description",
        "completed": False
    })
    response = await client.get("/tasks/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

@pytest.mark.asyncio
async def test_get_task_by_id(client):
    create_resp = await client.post("/tasks/", json={
        "title": "Specific Task",
        "description": "Details",
        "completed": False
    })
    task_id = create_resp.json()["id"]
    get_resp = await client.get(f"/tasks/{task_id}")
    assert get_resp.status_code == 200
    assert get_resp.json()["id"] == task_id

@pytest.mark.asyncio
async def test_update_task(client):
    create_resp = await client.post("/tasks/", json={
        "title": "Old Task",
        "description": "Old desc",
        "completed": False
    })
    task_id = create_resp.json()["id"]
    update_resp = await client.put(f"/tasks/{task_id}", json={
        "title": "Updated Task",
        "description": "Updated desc",
        "completed": True
    })
    assert update_resp.status_code == 200
    updated_data = update_resp.json()
    assert updated_data["title"] == "Updated Task"
    assert updated_data["is_completed"] is True  # ✅ Fixed key

@pytest.mark.asyncio
async def test_delete_task(client):
    create_resp = await client.post("/tasks/", json={
        "title": "Delete Me",
        "description": "To be deleted",
        "completed": False
    })
    task_id = create_resp.json()["id"]
    delete_resp = await client.delete(f"/tasks/{task_id}")
    assert delete_resp.status_code in [200, 204]
    get_resp = await client.get(f"/tasks/{task_id}")
    assert get_resp.status_code == 404

@pytest.mark.asyncio
async def test_create_task_validation_error(client):
    response = await client.post("/tasks/", json={
        "description": "No title",
        "completed": False
    })
    assert response.status_code == 422
