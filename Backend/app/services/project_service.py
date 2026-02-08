from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from uuid import UUID
from ..models.project import Project
from ..schemas.project import ProjectCreate, ProjectUpdate

class ProjectService:
    @staticmethod
    async def get_projects(db: AsyncSession):
        result = await db.execute(select(Project).order_by(Project.created_at.desc()))
        return result.scalars().all()

    @staticmethod
    async def create_project(db: AsyncSession, project: ProjectCreate):
        db_project = Project(**project.model_dump())
        db.add(db_project)
        await db.commit()
        await db.refresh(db_project)
        return db_project

    @staticmethod
    async def get_project(db: AsyncSession, project_id: UUID):
        result = await db.execute(
            select(Project)
            .where(Project.id == project_id)
            .options(selectinload(Project.modules))
        )
        return result.scalar_one_or_none()

    @staticmethod
    async def update_project(db: AsyncSession, project_id: UUID, project_update: ProjectUpdate):
        db_project = await ProjectService.get_project(db, project_id)
        if db_project:
            for key, value in project_update.model_dump(exclude_unset=True).items():
                setattr(db_project, key, value)
            await db.commit()
            await db.refresh(db_project)
        return db_project

    @staticmethod
    async def delete_project(db: AsyncSession, project_id: UUID):
        db_project = await ProjectService.get_project(db, project_id)
        if db_project:
            await db.delete(db_project)
            await db.commit()
            return True
        return False

    @staticmethod
    async def delete_all_projects(db: AsyncSession):
        result = await db.execute(select(Project))
        projects = result.scalars().all()
        for project in projects:
            await db.delete(project)
        await db.commit()
        return True

