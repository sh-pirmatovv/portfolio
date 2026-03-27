from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes_auth import router as auth_router
from app.api.routes_internal import router as internal_router
from app.api.routes_public import router as public_router
from app.core.config import settings

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
def healthcheck() -> dict[str, str]:
    return {"status": "healthy"}
