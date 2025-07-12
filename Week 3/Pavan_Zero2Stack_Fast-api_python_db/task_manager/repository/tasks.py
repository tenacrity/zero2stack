from sqlalchemy.future import select
from models.task import Task

async def create_task(db, text: str):
    new_task = Task(text=text)
    db.add(new_task)
    await db.commit()
    await db.refresh(new_task)
    return new_task

async def list_tasks(db):
    result = await db.execute(select(Task))
    return result.scalars().all()

async def mark_done(db, task_id: int):
    result = await db.execute(select(Task).where(Task.id == task_id))
    task = result.scalar_one_or_none()
    if task:
        task.done = True
        await db.commit()
        await db.refresh(task)
    return task

async def delete_task(db, task_id: int):
    result = await db.execute(select(Task).where(Task.id == task_id))
    task = result.scalar_one_or_none()
    if task:
        await db.delete(task)
        await db.commit()
    return task