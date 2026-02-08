from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from uuid import UUID
from ...database import get_db
from ...schemas.todo import TodoCreate, TodoUpdate, TodoResponse
from ...services.todo_service import TodoService
from ..deps import get_current_user

router = APIRouter(dependencies=[Depends(get_current_user)])


@router.get("/module/{module_id}/todos", response_model=List[TodoResponse])
async def list_todos(module_id: UUID, db: AsyncSession = Depends(get_db)):
    return await TodoService.get_todos(db, module_id)

@router.get("/upcoming", response_model=List[TodoResponse])
async def list_upcoming_todos(db: AsyncSession = Depends(get_db)):
    return await TodoService.get_all_upcoming_todos(db)

@router.post("/", response_model=TodoResponse)
async def create_todo(todo: TodoCreate, db: AsyncSession = Depends(get_db)):
    return await TodoService.create_todo(db, todo)

@router.get("/{todo_id}", response_model=TodoResponse)
async def get_todo(todo_id: UUID, db: AsyncSession = Depends(get_db)):
    todo = await TodoService.get_todo(db, todo_id)
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todo

@router.patch("/{todo_id}", response_model=TodoResponse)
async def update_todo(todo_id: UUID, todo_update: TodoUpdate, db: AsyncSession = Depends(get_db)):
    todo = await TodoService.update_todo(db, todo_id, todo_update)
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todo

@router.delete("/{todo_id}")
async def delete_todo(todo_id: UUID, db: AsyncSession = Depends(get_db)):
    success = await TodoService.delete_todo(db, todo_id)
    if not success:
        raise HTTPException(status_code=404, detail="Todo not found")
    return {"detail": "Todo deleted"}
