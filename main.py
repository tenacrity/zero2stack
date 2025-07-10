# main.py (modified)
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from dotenv import load_dotenv
import uvicorn
import os
from middleware.logger import LoggerMiddleware  # Import the middleware class
from routers import tasks

# Load environment variables
load_dotenv()

app = FastAPI(title="Task Manager API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add custom logger middleware
app.add_middleware(LoggerMiddleware)  # Use add_middleware instead of decorator

# Mount static directory
app.mount("/static", StaticFiles(directory="static"), name="static")

# Serve frontend index page at root
@app.get("/", include_in_schema=False)
def serve_frontend():
    return FileResponse("static/index.html")

# API routes
app.include_router(tasks.router)

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)