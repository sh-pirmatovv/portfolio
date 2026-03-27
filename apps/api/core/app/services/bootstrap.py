from app.data.demo_data import EVENTS, HEARTBEATS, PROJECTS, USAGE_SNAPSHOT
from app.models.schemas import MetricEvent, Project, ServiceHeartbeat, UsageSnapshot


def load_seed_projects() -> list[Project]:
    return [Project.model_validate(item) for item in PROJECTS]


def load_seed_heartbeats() -> list[ServiceHeartbeat]:
    return [ServiceHeartbeat.model_validate(item) for item in HEARTBEATS]


def load_seed_events() -> list[MetricEvent]:
    return [MetricEvent.model_validate(item) for item in EVENTS]


def load_seed_snapshot() -> UsageSnapshot:
    return UsageSnapshot.model_validate(USAGE_SNAPSHOT)
