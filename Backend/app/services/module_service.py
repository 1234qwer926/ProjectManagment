from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from uuid import UUID
from ..models.module import Module
from ..schemas.module import ModuleCreate, ModuleUpdate

class ModuleService:
    @staticmethod
    async def get_modules(db: AsyncSession, project_id: UUID):
        result = await db.execute(
            select(Module)
            .where(Module.project_id == project_id)
            .options(selectinload(Module.todos))
            .order_by(Module.order.asc())
        )
        return result.scalars().all()


    @staticmethod
    async def create_module(db: AsyncSession, module: ModuleCreate):
        db_module = Module(**module.model_dump())
        db.add(db_module)
        await db.commit()
        await db.refresh(db_module)
        return db_module

    @staticmethod
    async def get_module(db: AsyncSession, module_id: UUID):
        result = await db.execute(
            select(Module)
            .where(Module.id == module_id)
            .options(selectinload(Module.todos))
        )
        return result.scalar_one_or_none()

    @staticmethod
    async def update_module(db: AsyncSession, module_id: UUID, module_update: ModuleUpdate):
        db_module = await ModuleService.get_module(db, module_id)
        if db_module:
            for key, value in module_update.model_dump(exclude_unset=True).items():
                setattr(db_module, key, value)
            await db.commit()
            await db.refresh(db_module)
        return db_module

    @staticmethod
    async def delete_module(db: AsyncSession, module_id: UUID):
        db_module = await ModuleService.get_module(db, module_id)
        if db_module:
            await db.delete(db_module)
            await db.commit()
            return True
        return False
