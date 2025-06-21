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