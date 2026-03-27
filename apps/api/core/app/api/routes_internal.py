from fastapi import APIRouter

from app.models.schemas import DashboardOverview, HeartbeatIn, MetricEvent, MetricEventIn, ServiceHeartbeat
from app.services.registry import registry

router = APIRouter(prefix="/api/internal", tags=["internal"])


@router.post("/heartbeat", response_model=ServiceHeartbeat)
def ingest_heartbeat(payload: HeartbeatIn) -> ServiceHeartbeat:
    heartbeat = ServiceHeartbeat(
        service=payload.service,
        category=payload.category,
        status=payload.status,
        lastSeen="just now",
        latencyMs=payload.latency_ms,
    )
    return registry.ingest_heartbeat(heartbeat)


@router.post("/metrics", response_model=MetricEvent)
def ingest_metric(payload: MetricEventIn) -> MetricEvent:
    return registry.ingest_metric(payload)


@router.get("/dashboard/overview", response_model=DashboardOverview)
def dashboard_overview() -> DashboardOverview:
    return registry.dashboard_overview()


@router.get("/dashboard/services")
def dashboard_services() -> list[ServiceHeartbeat]:
    return registry.dashboard_overview().heartbeats


@router.get("/dashboard/projects")
def dashboard_projects():
    return registry.list_projects()


@router.get("/dashboard/activity")
def dashboard_activity() -> list[MetricEvent]:
    return registry.dashboard_overview().activity

