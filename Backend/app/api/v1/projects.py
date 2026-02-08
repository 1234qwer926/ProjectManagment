from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from uuid import UUID
from ...database import get_db
from ...schemas.project import ProjectCreate, ProjectUpdate, ProjectResponse, ProjectDetail
from ...services.project_service import ProjectService
from ..deps import get_current_user

router = APIRouter(dependencies=[Depends(get_current_user)])


@router.get("/", response_model=List[ProjectResponse])
async def list_projects(db: AsyncSession = Depends(get_db)):
    return await ProjectService.get_projects(db)

@router.post("/", response_model=ProjectResponse)
async def create_project(project: ProjectCreate, db: AsyncSession = Depends(get_db)):
    return await ProjectService.create_project(db, project)

@router.get("/{project_id}", response_model=ProjectDetail)
async def get_project(project_id: UUID, db: AsyncSession = Depends(get_db)):
    project = await ProjectService.get_project(db, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@router.patch("/{project_id}", response_model=ProjectResponse)
async def update_project(project_id: UUID, project_update: ProjectUpdate, db: AsyncSession = Depends(get_db)):
    project = await ProjectService.update_project(db, project_id, project_update)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@router.delete("/{project_id}")
async def delete_project(project_id: UUID, db: AsyncSession = Depends(get_db)):
    success = await ProjectService.delete_project(db, project_id)
    if not success:
        raise HTTPException(status_code=404, detail="Project not found")
    return {"detail": "Project deleted"}
@router.delete("/bulk/all")
async def delete_all_projects(db: AsyncSession = Depends(get_db)):
    await ProjectService.delete_all_projects(db)
    return {"detail": "All projects deleted"}
