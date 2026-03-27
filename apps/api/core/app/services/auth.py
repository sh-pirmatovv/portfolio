from uuid import uuid4

from fastapi import HTTPException, status

from app.core.config import settings
from app.models.schemas import AuthLoginRequest, AuthSession


class AuthService:
    def login(self, payload: AuthLoginRequest) -> AuthSession:
        if payload.username != settings.admin_username or payload.password != settings.admin_password:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
        return AuthSession(token=f"session_{uuid4().hex}", username=payload.username)


auth_service = AuthService()

