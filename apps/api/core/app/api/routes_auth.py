from fastapi import APIRouter, Header

from app.models.schemas import AuthLoginRequest, AuthMe, AuthSession
from app.services.auth import auth_service

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/login", response_model=AuthSession)
def login(payload: AuthLoginRequest) -> AuthSession:
    return auth_service.login(payload)


@router.post("/logout")
def logout(x_session_token: str | None = Header(default=None)) -> dict[str, str]:
    return auth_service.logout(x_session_token or "")


@router.get("/me", response_model=AuthMe)
def me(x_session_token: str | None = Header(default=None)) -> AuthMe:
    return auth_service.require_session(x_session_token)
