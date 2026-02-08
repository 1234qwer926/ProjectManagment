from sqlalchemy import Column, String, Text, Enum, ForeignKey, Integer, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
import enum
from ..database import Base

class ModuleType(str, enum.Enum):
    frontend = "frontend"
    backend = "backend"
    deployment = "deployment"
    custom = "custom"

class Module(Base):
    __tablename__ = "modules"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.id", ondelete="CASCADE"))
    type = Column(Enum(ModuleType), default=ModuleType.custom)
    title = Column(String, nullable=False)
    description = Column(Text)
    order = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    project = relationship("Project", back_populates="modules")
    todos = relationship("Todo", back_populates="module", cascade="all, delete-orphan")
