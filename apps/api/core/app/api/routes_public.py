from fastapi import APIRouter, HTTPException

from app.models.schemas import PlatformStatus, Project, UsageSnapshot
from app.services.platform import platform_service
from app.services.registry import registry_service

router = APIRouter(prefix="/api/public", tags=["public"])


@router.get("/projects", response_model=list[Project])
def list_projects() -> list[Project]:
    return registry_service.list_projects()


@router.get("/projects/{slug}", response_model=Project)
def get_project(slug: str) -> Project:
    project = registry_service.get_project(slug)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


@router.get("/overview", response_model=UsageSnapshot)
def get_overview() -> UsageSnapshot:
    return registry_service.public_overview()


@router.get("/platform", response_model=PlatformStatus)
def get_platform_status() -> PlatformStatus:
    return platform_service.build_status(registry_service.list_projects())
