import json
import os
import urllib.error
import urllib.request
from datetime import datetime, timezone


SERVICE_SLUG = "lead-qualifier"
BOT_TOKEN = os.getenv("BOT_TOKEN", "demo-token")
API_BASE_URL = os.getenv("API_BASE_URL", "http://localhost:8000")

QUALIFIED_LEADS = [
    {"account": "Northstar Logistics", "score": 94, "intent": "Needs multi-queue workflow automation"},
    {"account": "Aster Commerce", "score": 88, "intent": "Wants operator dashboard with approval rails"},
    {"account": "Helio Labs", "score": 91, "intent": "Requested executive reporting and escalation flows"},
]


def utcnow_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def emit_heartbeat() -> dict[str, object]:
    return {
        "service": SERVICE_SLUG,
        "category": "bot",
        "status": "healthy",
        "latencyMs": 17,
        "timestamp": utcnow_iso(),
        "apiBaseUrl": API_BASE_URL,
    }


def qualification_summary() -> dict[str, object]:
    top_lead = max(QUALIFIED_LEADS, key=lambda item: item["score"])
    return {
        "title": "lead-qualifier scored inbound operations leads",
        "detail": f"Top lead is {top_lead['account']} with score {top_lead['score']} and intent: {top_lead['intent']}.",
        "state": "healthy",
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
    usage = qualification_summary()

    print(f"[boot] {SERVICE_SLUG} initialized")
    print(f"[qualified] {QUALIFIED_LEADS}")
    print(f"[heartbeat] {heartbeat}")
    print(f"[metric] {usage}")

    heartbeat_ok, heartbeat_response = post_json("/api/internal/heartbeat", heartbeat)
    metric_ok, metric_response = post_json("/api/internal/metrics", usage)

    print(f"[heartbeat-post] ok={heartbeat_ok} response={heartbeat_response}")
    print(f"[metric-post] ok={metric_ok} response={metric_response}")
    print(f"[token-check] configured={len(BOT_TOKEN) > 0}")


if __name__ == "__main__":
    main()
