from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from repository import tasks as task_repo
from db import get_db
from pydantic import BaseModel

router = APIRouter()

class TaskCreate(BaseModel):
    text: str

@router.post("/tasks")
async def create_task(payload: TaskCreate, db: AsyncSession = Depends(get_db)):
    return await task_repo.create_task(db, payload.text)

@router.get("/tasks")
async def list_tasks(db: AsyncSession = Depends(get_db)):
    return await task_repo.list_tasks(db)

@router.put("/tasks/{task_id}/done")
async def mark_done(task_id: int, db: AsyncSession = Depends(get_db)):
    task = await task_repo.mark_done(db, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.delete("/tasks/{task_id}")
async def delete_task(task_id: int, db: AsyncSession = Depends(get_db)):
    task = await task_repo.delete_task(db, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"detail": "Deleted"}