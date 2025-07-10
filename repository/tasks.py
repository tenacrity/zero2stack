from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from models.task import Task


# CREATE
async def create_task(session: AsyncSession, title: str, description: str = None) -> Task:
    new_task = Task(title=title, description=description)
    session.add(new_task)
    await session.commit()
    await session.refresh(new_task)
    return new_task


# READ ALL
async def get_all_tasks(session: AsyncSession) -> list[Task]:
    result = await session.execute(select(Task))
    return result.scalars().all()


# READ ONE BY ID
async def get_task_by_id(session: AsyncSession, task_id: int) -> Task | None:
    result = await session.execute(select(Task).where(Task.id == task_id))
    return result.scalar_one_or_none()


# UPDATE
async def update_task(
    session: AsyncSession,
    task_id: int,
    title: str = None,
    description: str = None,
    is_completed: bool = None
) -> Task | None:
    task = await get_task_by_id(session, task_id)
    if not task:
        return None

    if title is not None:
        task.title = title
    if description is not None:
        task.description = description
    if is_completed is not None:
        task.is_completed = is_completed

    await session.commit()
    await session.refresh(task)
    return task


# DELETE
async def delete_task(session: AsyncSession, task_id: int) -> bool:
    task = await get_task_by_id(session, task_id)
    if not task:
        return False

    await session.delete(task)
    await session.commit()
    return True
