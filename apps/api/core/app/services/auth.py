from datetime import timedelta
from uuid import uuid4

from fastapi import HTTPException, status

from app.core.config import settings
from app.core.runtime import SessionRecord, runtime, utcnow
from app.models.schemas import AuthLoginRequest, AuthMe, AuthSession


class AuthService:
    def login(self, payload: AuthLoginRequest) -> AuthSession:
        if payload.username != settings.admin_username or payload.password != settings.admin_password:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
        issued_at = utcnow()
        expires_at = issued_at + timedelta(seconds=settings.session_ttl_seconds)
        token = f"session_{uuid4().hex}"
        runtime.sessions[token] = SessionRecord(username=payload.username, issued_at=issued_at, expires_at=expires_at)
        return AuthSession(token=token, username=payload.username, expiresAt=expires_at)

    def logout(self, token: str) -> dict[str, str]:
        runtime.sessions.pop(token, None)
        return {"status": "logged_out"}

    def require_session(self, token: str | None) -> AuthMe:
        runtime.cleanup_sessions()
        if settings.allow_insecure_internal_routes and settings.demo_mode and not token:
            now = utcnow()
            return AuthMe(username=settings.admin_username, issuedAt=now, expiresAt=now)
        if not token:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing session token")
        session = runtime.sessions.get(token)
        if session is None or session.is_expired():
            runtime.sessions.pop(token, None)
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired session")
        return session.as_auth_me()


auth_service = AuthService()
