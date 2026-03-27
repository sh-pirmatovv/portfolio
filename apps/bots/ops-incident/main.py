import os
from datetime import datetime


SERVICE_SLUG = os.getenv("SERVICE_SLUG", "bot-service")
BOT_TOKEN = os.getenv("BOT_TOKEN", "demo-token")
API_BASE_URL = os.getenv("API_BASE_URL", "http://localhost:8000")


def emit_heartbeat() -> dict[str, object]:
    return {
        "service": SERVICE_SLUG,
        "category": "bot",
        "status": "healthy",
        "latencyMs": 18,
        "timestamp": datetime.utcnow().isoformat(),
        "apiBaseUrl": API_BASE_URL,
    }


def emit_usage() -> dict[str, object]:
    return {
        "title": f"{SERVICE_SLUG} interaction tick",
        "detail": f"{SERVICE_SLUG} prepared an interaction metric using token length {len(BOT_TOKEN)}.",
        "state": "healthy",
    }


def main() -> None:
    print(f"[boot] {SERVICE_SLUG} initialized")
    print(f"[heartbeat] {emit_heartbeat()}")
    print(f"[metric] {emit_usage()}")


if __name__ == "__main__":
    main()

