import json
import os
import urllib.error
import urllib.request
from datetime import datetime, timezone


SERVICE_SLUG = "lead-aggregator"
SOURCE_URL = os.getenv("SOURCE_URL", "https://example.com/lead-feed")
API_BASE_URL = os.getenv("API_BASE_URL", "http://localhost:8000")

RAW_LEADS = [
    {"account": "Northstar Logistics", "source": "marketplace", "teamSize": 45},
    {"account": "Aster Commerce", "source": "referral", "teamSize": 23},
    {"account": "Helio Labs", "source": "directory", "teamSize": 31},
]


def utcnow_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def emit_heartbeat() -> dict[str, object]:
    return {
        "service": SERVICE_SLUG,
        "category": "parser",
        "status": "healthy",
        "latencyMs": 28,
        "timestamp": utcnow_iso(),
        "apiBaseUrl": API_BASE_URL,
    }


def aggregate_leads() -> dict[str, object]:
    sources = sorted({lead["source"] for lead in RAW_LEADS})
    return {
        "title": "lead-aggregator prepared qualified candidate feed",
        "detail": f"Aggregated {len(RAW_LEADS)} lead candidates from {', '.join(sources)} via {SOURCE_URL}.",
        "state": "healthy",
        "runAt": utcnow_iso(),
    }


def post_json(path: str, payload: dict[str, object]) -> tuple[bool, str]:
    request = urllib.request.Request(
        url=f"{API_BASE_URL}{path}",
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(request, timeout=5) as response:
            return True, response.read().decode("utf-8")
    except (urllib.error.URLError, TimeoutError) as exc:
        return False, str(exc)


def main() -> None:
    heartbeat = emit_heartbeat()
    run_result = aggregate_leads()

    print(f"[boot] {SERVICE_SLUG} parser ready")
    print(f"[source] {SOURCE_URL}")
    print(f"[raw-leads] {RAW_LEADS}")
    print(f"[heartbeat] {heartbeat}")
    print(f"[run] {run_result}")

    heartbeat_ok, heartbeat_response = post_json("/api/internal/heartbeat", heartbeat)
    metric_ok, metric_response = post_json("/api/internal/metrics", run_result)

    print(f"[heartbeat-post] ok={heartbeat_ok} response={heartbeat_response}")
    print(f"[metric-post] ok={metric_ok} response={metric_response}")


if __name__ == "__main__":
    main()
