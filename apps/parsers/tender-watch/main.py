import os
from datetime import datetime


SERVICE_SLUG = os.getenv("SERVICE_SLUG", "parser-service")
SOURCE_URL = os.getenv("SOURCE_URL", "https://example.com")
API_BASE_URL = os.getenv("API_BASE_URL", "http://localhost:8000")


def run_parser() -> dict[str, object]:
    return {
        "title": f"{SERVICE_SLUG} completed run",
        "detail": f"Collected demo payload from {SOURCE_URL} and prepared normalized summary output.",
        "state": "healthy",
        "runAt": datetime.utcnow().isoformat(),
    }


def emit_heartbeat() -> dict[str, object]:
    return {
        "service": SERVICE_SLUG,
        "category": "parser",
        "status": "healthy",
        "latencyMs": 34,
        "apiBaseUrl": API_BASE_URL,
    }


def main() -> None:
    print(f"[boot] {SERVICE_SLUG} parser ready")
    print(f"[heartbeat] {emit_heartbeat()}")
    print(f"[run] {run_parser()}")


if __name__ == "__main__":
    main()
