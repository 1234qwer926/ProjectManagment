from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from datetime import datetime, timedelta

from uuid import UUID
from ..models.todo import Todo
from ..models.module import Module
from ..models.project import Project
from ..schemas.todo import TodoCreate, TodoUpdate
from sqlalchemy.orm import joinedload

class TodoService:
    @staticmethod
    async def get_todos(db: AsyncSession, module_id: UUID):
        await TodoService._reschedule_overdue_todos(db)
        result = await db.execute(
            select(Todo)
            .where(Todo.module_id == module_id)
            .order_by(Todo.order.asc())
        )
        return result.scalars().all()


    @staticmethod
    async def create_todo(db: AsyncSession, todo: TodoCreate):
        db_todo = Todo(**todo.model_dump())
        db.add(db_todo)
        await db.commit()
        await db.refresh(db_todo)
        return db_todo

    @staticmethod
    async def get_todo(db: AsyncSession, todo_id: UUID):
        result = await db.execute(select(Todo).where(Todo.id == todo_id))
        return result.scalar_one_or_none()

    @staticmethod
    async def update_todo(db: AsyncSession, todo_id: UUID, todo_update: TodoUpdate):
        db_todo = await TodoService.get_todo(db, todo_id)
        if db_todo:
            for key, value in todo_update.model_dump(exclude_unset=True).items():
                setattr(db_todo, key, value)
            await db.commit()
            await db.refresh(db_todo)
        return db_todo

    @staticmethod
    async def get_all_upcoming_todos(db: AsyncSession):
        await TodoService._reschedule_overdue_todos(db)
        result = await db.execute(
            select(Todo)
            .options(joinedload(Todo.module).joinedload(Module.project))
            .where(Todo.due_date.isnot(None))
            .where(Todo.status != "done")
            .order_by(Todo.due_date.asc())
        )
        todos = result.scalars().all()
        for todo in todos:
            todo.module_title = todo.module.title
            todo.project_name = todo.module.project.name
            todo.project_id = todo.module.project.id
        return todos

    @staticmethod
    async def _reschedule_overdue_todos(db: AsyncSession):
        today = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
        result = await db.execute(
            select(Todo)
            .where(Todo.due_date < today)
            .where(Todo.status != "done")
        )
        overdue_todos = result.scalars().all()
        if overdue_todos:
            tomorrow = today + timedelta(days=1)
            for todo in overdue_todos:
                todo.due_date = tomorrow
            await db.commit()


    @staticmethod
    async def delete_todo(db: AsyncSession, todo_id: UUID):
        db_todo = await TodoService.get_todo(db, todo_id)
        if db_todo:
            await db.delete(db_todo)
            await db.commit()
            return True
        return False
