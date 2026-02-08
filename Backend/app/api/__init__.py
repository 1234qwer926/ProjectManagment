from fastapi import APIRouter
from .v1 import projects, modules, todos, auth

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(projects.router, prefix="/projects", tags=["projects"])
api_router.include_router(modules.router, prefix="/modules", tags=["modules"])
api_router.include_router(todos.router, prefix="/todos", tags=["todos"])


