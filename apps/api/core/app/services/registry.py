from copy import deepcopy

from app.core.config import settings
from app.core.runtime import runtime, utcnow
from app.models.schemas import (
    DashboardActivityResponse,
    DashboardOverview,
    DashboardProject,
    DashboardProjectsResponse,
    DashboardServicesResponse,
    HeartbeatIn,
    MetricEvent,
    MetricEventIn,
    Project,
    ServiceHeartbeat,
    UsageSnapshot,
)
from app.services.bootstrap import load_seed_events, load_seed_heartbeats, load_seed_projects, load_seed_snapshot


class RegistryService:
    def __init__(self) -> None:
        self._projects = load_seed_projects()
        self._heartbeats = load_seed_heartbeats()
        self._events = load_seed_events()
        self._snapshot = load_seed_snapshot()

    def list_projects(self) -> list[Project]:
        return deepcopy(self._projects)

    def get_project(self, slug: str) -> Project | None:
        project = next((entry for entry in self._projects if entry.slug == slug), None)
        return deepcopy(project) if project else None

    def public_overview(self) -> UsageSnapshot:
        self._refresh_usage_snapshot()
        return deepcopy(self._snapshot)

    def dashboard_overview(self) -> DashboardOverview:
        self._refresh_usage_snapshot()
        return DashboardOverview(snapshot=self._snapshot, heartbeats=self.services().services, activity=self.activity().activity)

    def services(self) -> DashboardServicesResponse:
        return DashboardServicesResponse(services=sorted(deepcopy(self._heartbeats), key=lambda item: item.service))

    def projects_for_dashboard(self) -> DashboardProjectsResponse:
        dashboard_projects: list[DashboardProject] = []
        for project in self._projects:
            latest_heartbeat = next((item for item in self._heartbeats if item.service == project.slug), None)
            recent_events = [
                event
                for event in self._events
                if project.slug.replace("-", " ") in event.title.lower() or project.slug in event.detail.lower()
            ][:3]
            dashboard_projects.append(
                DashboardProject(project=deepcopy(project), latestHeartbeat=deepcopy(latest_heartbeat), recentEvents=deepcopy(recent_events))
            )
        return DashboardProjectsResponse(projects=dashboard_projects)

    def activity(self) -> DashboardActivityResponse:
        return DashboardActivityResponse(activity=deepcopy(self._events[:20]))

    def ingest_heartbeat(self, payload: HeartbeatIn) -> ServiceHeartbeat:
        heartbeat = ServiceHeartbeat(
            service=payload.service,
            category=payload.category,
            status=payload.status,
            lastSeen="just now",
            latencyMs=payload.latency_ms,
        )
        existing = next((entry for entry in self._heartbeats if entry.service == heartbeat.service), None)
        if existing:
            existing.status = heartbeat.status
            existing.category = heartbeat.category
            existing.last_seen = heartbeat.last_seen
            existing.latency_ms = heartbeat.latency_ms
        else:
            self._heartbeats.append(heartbeat)
        self._events.insert(
            0,
            MetricEvent(
                id=self._next_event_id(),
                title=f"{payload.service} heartbeat received",
                detail=f"Heartbeat captured for {payload.category} service with {payload.latency_ms}ms latency.",
                timestamp=utcnow().strftime("%H:%M"),
                state=payload.status,
            ),
        )
        self._truncate_events()
        self._refresh_usage_snapshot()
        return deepcopy(existing or heartbeat)

    def ingest_metric(self, metric: MetricEventIn) -> MetricEvent:
        event = MetricEvent(
            id=self._next_event_id(),
            title=metric.title,
            detail=metric.detail,
            timestamp=utcnow().strftime("%H:%M"),
            state=metric.state,
        )
        self._events.insert(0, event)
        self._truncate_events()
        self._snapshot.requests_per_minute += 3
        return deepcopy(event)

    def stale_services_count(self) -> int:
        stale_markers = {"6m ago", "7m ago", "8m ago", "9m ago", "10m ago"}
        return sum(heartbeat.last_seen in stale_markers for heartbeat in self._heartbeats)

    def services_observed_count(self) -> int:
        return len(self._heartbeats)

    def _refresh_usage_snapshot(self) -> None:
        self._snapshot.active_services = len(self._projects)
        self._snapshot.automation_runs = max(self._snapshot.automation_runs, len(self._events) * 19)
        self._snapshot.requests_per_minute = max(self._snapshot.requests_per_minute, 240 + len(self._heartbeats) * 7)
        uptime = utcnow() - runtime.started_at
        total_seconds = int(uptime.total_seconds())
        hours, remainder = divmod(total_seconds, 3600)
        minutes, _ = divmod(remainder, 60)
        self._snapshot.uptime = f"{hours}h {minutes}m"

    def _truncate_events(self) -> None:
        self._events = self._events[: settings.event_history_limit]

    def _next_event_id(self) -> str:
        return f"evt_{len(self._events) + 1:03d}"


registry_service = RegistryService()
