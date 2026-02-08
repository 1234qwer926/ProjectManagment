from pydantic import BaseModel, ConfigDict
from uuid import UUID
from datetime import datetime
from typing import Optional, List
from ..models.module import ModuleType

class ModuleBase(BaseModel):
    title: str
    description: Optional[str] = None
    type: ModuleType = ModuleType.custom
    order: int = 0

class ModuleCreate(ModuleBase):
    project_id: UUID

class ModuleUpdate(ModuleBase):
    title: Optional[str] = None
    order: Optional[int] = None

class ModuleResponse(ModuleBase):
    id: UUID
    project_id: UUID
    created_at: datetime
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)

from .todo import TodoResponse

class ModuleDetail(ModuleResponse):
    todos: List[TodoResponse] = []

    model_config = ConfigDict(from_attributes=True)
