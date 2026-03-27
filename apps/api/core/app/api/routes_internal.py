from fastapi import APIRouter, Depends, Header

from app.models.schemas import DashboardActivityResponse, DashboardOverview, DashboardProjectsResponse, DashboardServicesResponse, HeartbeatIn, MetricEvent, MetricEventIn, AuthMe, ServiceHeartbeat
from app.services.auth import auth_service
from app.services.registry import registry_service

router = APIRouter(prefix="/api/internal", tags=["internal"])


def require_operator(x_session_token: str | None = Header(default=None)) -> AuthMe:
    return auth_service.require_session(x_session_token)


@router.post("/heartbeat", response_model=ServiceHeartbeat)
def ingest_heartbeat(payload: HeartbeatIn) -> ServiceHeartbeat:
    return registry_service.ingest_heartbeat(payload)


@router.post("/metrics", response_model=MetricEvent)
def ingest_metric(payload: MetricEventIn) -> MetricEvent:
    return registry_service.ingest_metric(payload)


@router.get("/dashboard/overview", response_model=DashboardOverview)
def dashboard_overview(_: AuthMe = Depends(require_operator)) -> DashboardOverview:
    return registry_service.dashboard_overview()


@router.get("/dashboard/services", response_model=DashboardServicesResponse)
def dashboard_services(_: AuthMe = Depends(require_operator)) -> DashboardServicesResponse:
    return registry_service.services()


@router.get("/dashboard/projects", response_model=DashboardProjectsResponse)
def dashboard_projects(_: AuthMe = Depends(require_operator)) -> DashboardProjectsResponse:
    return registry_service.projects_for_dashboard()


@router.get("/dashboard/activity", response_model=DashboardActivityResponse)
def dashboard_activity(_: AuthMe = Depends(require_operator)) -> DashboardActivityResponse:
    return registry_service.activity()
