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