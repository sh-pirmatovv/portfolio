from copy import deepcopy

from app.data.demo_data import EVENTS, HEARTBEATS, PROJECTS, USAGE_SNAPSHOT
from app.models.schemas import DashboardOverview, MetricEvent, MetricEventIn, Project, ServiceHeartbeat, UsageSnapshot


class InMemoryRegistry:
    def __init__(self) -> None:
        self._projects = [Project.model_validate(item) for item in PROJECTS]
        self._heartbeats = [ServiceHeartbeat.model_validate(item) for item in HEARTBEATS]
        self._events = [MetricEvent.model_validate(item) for item in EVENTS]
        self._snapshot = UsageSnapshot.model_validate(USAGE_SNAPSHOT)

    def list_projects(self) -> list[Project]:
        return deepcopy(self._projects)

    def get_project(self, slug: str) -> Project | None:
        return next((project for project in self._projects if project.slug == slug), None)

    def public_overview(self) -> UsageSnapshot:
        return deepcopy(self._snapshot)

    def dashboard_overview(self) -> DashboardOverview:
        return DashboardOverview(snapshot=self._snapshot, heartbeats=self._heartbeats, activity=self._events)

    def ingest_heartbeat(self, heartbeat: ServiceHeartbeat) -> ServiceHeartbeat:
        existing = next((entry for entry in self._heartbeats if entry.service == heartbeat.service), None)
        if existing:
            existing.status = heartbeat.status
            existing.last_seen = heartbeat.last_seen
            existing.latency_ms = heartbeat.latency_ms
            return existing

        self._heartbeats.append(heartbeat)
        return heartbeat

    def ingest_metric(self, metric: MetricEventIn) -> MetricEvent:
        event = MetricEvent(
            id=f"evt_{len(self._events) + 1:03d}",
            title=metric.title,
            detail=metric.detail,
            timestamp="now",
            state=metric.state,
        )
        self._events.insert(0, event)
        self._events = self._events[:20]
        return event


registry = InMemoryRegistry()

