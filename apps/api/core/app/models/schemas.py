from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field


HealthState = Literal["healthy", "degraded", "alert"]
ProjectCategory = Literal["portfolio", "website", "bot", "parser", "dashboard", "backend"]


class ApiModel(BaseModel):
    model_config = ConfigDict(populate_by_name=True)


class Project(ApiModel):
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


class UsageSnapshot(ApiModel):
    active_services: int = Field(alias="activeServices")
    automation_runs: int = Field(alias="automationRuns")
    requests_per_minute: int = Field(alias="requestsPerMinute")
    uptime: str


class ServiceHeartbeat(ApiModel):
    service: str
    category: ProjectCategory
    status: HealthState
    last_seen: str = Field(alias="lastSeen")
    latency_ms: int = Field(alias="latencyMs")


class MetricEvent(ApiModel):
    id: str
    title: str
    detail: str
    timestamp: str
    state: HealthState


class DashboardOverview(ApiModel):
    snapshot: UsageSnapshot
    heartbeats: list[ServiceHeartbeat]
    activity: list[MetricEvent]


class StorageTargets(ApiModel):
    database_url: str = Field(alias="databaseUrl")
    redis_url: str = Field(alias="redisUrl")
    demo_mode: bool = Field(alias="demoMode")


class ServiceTopology(ApiModel):
    websites: int
    bots: int
    parsers: int
    dashboards: int
    backend_services: int = Field(alias="backendServices")


class PlatformStatus(ApiModel):
    app_name: str = Field(alias="appName")
    environment: str
    demo_mode: bool = Field(alias="demoMode")
    started_at: datetime = Field(alias="startedAt")
    storage: StorageTargets
    topology: ServiceTopology


class HealthResponse(ApiModel):
    status: str
    environment: str
    demo_mode: bool = Field(alias="demoMode")
    active_sessions: int = Field(alias="activeSessions")
    services_observed: int = Field(alias="servicesObserved")
    stale_services: int = Field(alias="staleServices")


class HeartbeatIn(ApiModel):
    service: str
    category: ProjectCategory
    status: HealthState
    latency_ms: int = Field(alias="latencyMs", ge=0)


class MetricEventIn(ApiModel):
    title: str
    detail: str
    state: HealthState = "healthy"


class AuthLoginRequest(ApiModel):
    username: str
    password: str


class AuthSession(ApiModel):
    token: str
    username: str
    expires_at: datetime = Field(alias="expiresAt")


class AuthMe(ApiModel):
    username: str
    expires_at: datetime = Field(alias="expiresAt")
    issued_at: datetime = Field(alias="issuedAt")


class DashboardProject(ApiModel):
    project: Project
    latest_heartbeat: ServiceHeartbeat | None = Field(alias="latestHeartbeat")
    recent_events: list[MetricEvent] = Field(alias="recentEvents")


class DashboardServicesResponse(ApiModel):
    services: list[ServiceHeartbeat]


class DashboardProjectsResponse(ApiModel):
    projects: list[DashboardProject]


class DashboardActivityResponse(ApiModel):
    activity: list[MetricEvent]
