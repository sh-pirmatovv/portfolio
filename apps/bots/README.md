# Telegram Bots

Each bot service is intentionally lightweight but production-styled:

- aiogram-oriented Python entrypoint
- shared heartbeat and metric payload shape
- central registration through the backend core
- ready to be expanded with real handlers and Redis-backed flows

