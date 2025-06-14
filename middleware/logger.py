# middleware/logger.py
import time
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware

async def logger_middleware(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    print(f"{request.method} {request.url.path} {response.status_code} - {process_time:.2f}s")
    return response 