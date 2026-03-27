from fastapi import APIRouter

from app.models.schemas import AuthLoginRequest, AuthSession
from app.services.auth import auth_service

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/login", response_model=AuthSession)
def login(payload: AuthLoginRequest) -> AuthSession:
    return auth_service.login(payload)


@router.post("/logout")
def logout() -> dict[str, str]:
    return {"status": "logged_out"}

