from dataclasses import dataclass, field
from datetime import datetime, timedelta, timezone

from app.core.config import settings
from app.models.schemas import AuthMe


def utcnow() -> datetime:
    return datetime.now(timezone.utc)


@dataclass
class SessionRecord:
    username: str
    issued_at: datetime
    expires_at: datetime

    def as_auth_me(self) -> AuthMe:
        return AuthMe(username=self.username, issuedAt=self.issued_at, expiresAt=self.expires_at)

    def is_expired(self, now: datetime | None = None) -> bool:
        return (now or utcnow()) >= self.expires_at


@dataclass
class AppRuntime:
    started_at: datetime = field(default_factory=utcnow)
    sessions: dict[str, SessionRecord] = field(default_factory=dict)

    def new_expiry(self) -> datetime:
        return utcnow() + timedelta(seconds=settings.session_ttl_seconds)

    def cleanup_sessions(self) -> None:
        now = utcnow()
        expired = [token for token, record in self.sessions.items() if record.is_expired(now)]
        for token in expired:
            self.sessions.pop(token, None)


runtime = AppRuntime()
