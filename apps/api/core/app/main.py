from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes_auth import router as auth_router
from app.api.routes_internal import router as internal_router
from app.api.routes_public import router as public_router
from app.core.config import settings
from app.services.platform import platform_service
from app.services.registry import registry_service

app = FastAPI(title=settings.app_name)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(public_router)
app.include_router(internal_router)
app.include_router(auth_router)


@app.get("/health")
def healthcheck():
    return platform_service.health_response(
        services_observed=registry_service.services_observed_count(),
        stale_services=registry_service.stale_services_count(),
    )


@app.get("/ready")
def readiness() -> dict[str, object]:
    return {
        "status": "ready",
        "environment": settings.environment,
        "demoMode": settings.demo_mode,
        "databaseUrl": settings.database_url,
        "redisUrl": settings.redis_url,
    }
