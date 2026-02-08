from pydantic import BaseModel, ConfigDict
from uuid import UUID
from datetime import datetime
from typing import Optional, List
from ..models.todo import TodoPriority, TodoStatus

class TodoBase(BaseModel):
    title: str
    description: Optional[str] = None
    priority: TodoPriority = TodoPriority.medium
    status: TodoStatus = TodoStatus.todo
    tags: List[str] = []
    due_date: Optional[datetime] = None
    order: int = 0

class TodoCreate(TodoBase):
    module_id: UUID

class TodoUpdate(TodoBase):
    title: Optional[str] = None
    status: Optional[TodoStatus] = None
    priority: Optional[TodoPriority] = None

class TodoResponse(TodoBase):
    id: UUID
    module_id: UUID
    project_id: Optional[UUID] = None
    project_name: Optional[str] = None
    module_title: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)
