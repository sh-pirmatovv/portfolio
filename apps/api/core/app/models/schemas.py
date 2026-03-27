from typing import Literal

from pydantic import BaseModel, Field


HealthState = Literal["healthy", "degraded", "alert"]
ProjectCategory = Literal["portfolio", "website", "bot", "parser", "dashboard", "backend"]


class Project(BaseModel):
    slug: str
    title: str
    category: ProjectCategory
    description: str
    stack: list[str]
    metrics_label: str = Field(alias="metricsLabel")
    status: HealthState
    href: str
    companion_bots: list[str] = Field(alias="companionBots")
    companion_parsers: list[str] = Field(alias="companionParsers")


class UsageSnapshot(BaseModel):
    active_services: int = Field(alias="activeServices")
    automation_runs: int = Field(alias="automationRuns")
    requests_per_minute: int = Field(alias="requestsPerMinute")
    uptime: str


class ServiceHeartbeat(BaseModel):
    service: str
    category: ProjectCategory
    status: HealthState
    last_seen: str = Field(alias="lastSeen")
    latency_ms: int = Field(alias="latencyMs")


class MetricEvent(BaseModel):
    id: str
    title: str
    detail: str
    timestamp: str
    state: HealthState


class DashboardOverview(BaseModel):
    snapshot: UsageSnapshot
    heartbeats: list[ServiceHeartbeat]
    activity: list[MetricEvent]


class HeartbeatIn(BaseModel):
    service: str
    category: ProjectCategory
    status: HealthState
    latency_ms: int = Field(alias="latencyMs", ge=0)


class MetricEventIn(BaseModel):
    title: str
    detail: str
    state: HealthState = "healthy"


class AuthLoginRequest(BaseModel):
    username: str
    password: str


class AuthSession(BaseModel):
    token: str
    username: str

