from app.core.config import settings
from app.core.runtime import runtime
from app.models.schemas import HealthResponse, PlatformStatus, Project, ServiceTopology, StorageTargets


class PlatformService:
    def build_status(self, projects: list[Project]) -> PlatformStatus:
        websites = sum(project.category in {"portfolio", "website"} for project in projects)
        bots = sum(project.category == "bot" for project in projects)
        parsers = sum(project.category == "parser" for project in projects)
        dashboards = sum(project.category == "dashboard" for project in projects)
        backend_services = sum(project.category == "backend" for project in projects)
        return PlatformStatus(
            appName=settings.app_name,
            environment=settings.environment,
            demoMode=settings.demo_mode,
            startedAt=runtime.started_at,
            storage=StorageTargets(
                databaseUrl=settings.database_url,
                redisUrl=settings.redis_url,
                demoMode=settings.demo_mode,
            ),
            topology=ServiceTopology(
                websites=websites,
                bots=bots,
                parsers=parsers,
                dashboards=dashboards,
                backendServices=backend_services,
            ),
        )

    def health_response(self, services_observed: int, stale_services: int) -> HealthResponse:
        runtime.cleanup_sessions()
        return HealthResponse(
            status="healthy" if stale_services == 0 else "degraded",
            environment=settings.environment,
            demoMode=settings.demo_mode,
            activeSessions=len(runtime.sessions),
            servicesObserved=services_observed,
            staleServices=stale_services,
        )


platform_service = PlatformService()
