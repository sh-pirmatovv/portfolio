from fastapi import APIRouter, HTTPException

from app.models.schemas import Project, UsageSnapshot
from app.services.registry import registry

router = APIRouter(prefix="/api/public", tags=["public"])


@router.get("/projects", response_model=list[Project])
def list_projects() -> list[Project]:
    return registry.list_projects()


@router.get("/projects/{slug}", response_model=Project)
def get_project(slug: str) -> Project:
    project = registry.get_project(slug)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


@router.get("/overview", response_model=UsageSnapshot)
def get_overview() -> UsageSnapshot:
    return registry.public_overview()

