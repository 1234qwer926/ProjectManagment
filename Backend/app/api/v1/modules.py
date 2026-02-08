from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from uuid import UUID
from ...database import get_db
from ...schemas.module import ModuleCreate, ModuleUpdate, ModuleResponse, ModuleDetail
from ...services.module_service import ModuleService
from ..deps import get_current_user

router = APIRouter(dependencies=[Depends(get_current_user)])


@router.get("/project/{project_id}/modules", response_model=List[ModuleDetail])
async def list_modules(project_id: UUID, db: AsyncSession = Depends(get_db)):
    return await ModuleService.get_modules(db, project_id)


@router.post("/", response_model=ModuleResponse)
async def create_module(module: ModuleCreate, db: AsyncSession = Depends(get_db)):
    return await ModuleService.create_module(db, module)

@router.get("/{module_id}", response_model=ModuleDetail)
async def get_module(module_id: UUID, db: AsyncSession = Depends(get_db)):
    module = await ModuleService.get_module(db, module_id)
    if not module:
        raise HTTPException(status_code=404, detail="Module not found")
    return module

@router.patch("/{module_id}", response_model=ModuleResponse)
async def update_module(module_id: UUID, module_update: ModuleUpdate, db: AsyncSession = Depends(get_db)):
    module = await ModuleService.update_module(db, module_id, module_update)
    if not module:
        raise HTTPException(status_code=404, detail="Module not found")
    return module

@router.delete("/{module_id}")
async def delete_module(module_id: UUID, db: AsyncSession = Depends(get_db)):
    success = await ModuleService.delete_module(db, module_id)
    if not success:
        raise HTTPException(status_code=404, detail="Module not found")
    return {"detail": "Module deleted"}
