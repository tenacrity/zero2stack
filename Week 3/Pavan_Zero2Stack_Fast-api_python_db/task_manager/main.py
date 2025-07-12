from fastapi import FastAPI, Request, Depends
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy.ext.asyncio import AsyncSession
from routers import tasks as task_routes
from repository import tasks as task_repo
from db import get_db

app = FastAPI()
app.include_router(task_routes.router)
templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request, db: AsyncSession = Depends(get_db)):
    tasks = await task_repo.list_tasks(db)
    return templates.TemplateResponse("index.html", {"request": request, "tasks": tasks})