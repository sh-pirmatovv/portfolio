# Shahzodbek Pirmatov Premium Portfolio Ecosystem

Monorepo for a premium fullstack portfolio ecosystem that showcases Shahzodbek Pirmatov as a builder of intelligent digital systems.

## Workspace

- `apps/web/portfolio`: cinematic command-hub portfolio
- `apps/web/monitoring`: internal monitoring dashboard
- `apps/web/sites/*`: ten themed business websites
- `apps/api/core`: FastAPI backend core for registry, metrics, health, and auth
- `apps/bots/*`: Telegram bot services
- `apps/parsers/*`: parser and automation services
- `packages/ui`: shared luxury watch-inspired design system
- `packages/content`: portfolio copy, seeded projects, and demo metrics
- `packages/sdk`: typed contracts and simple API client helpers
- `infra`: Docker, reverse proxy, and CI scaffolding

## Visual direction

The UI language is inspired by a transparent mechanical watch:

- black glass surfaces
- smoked chrome accents
- layered transparency
- visible structure and metrics
- measured motion
- premium typography

## Runbook

Tooling is scaffolded for `pnpm` + Turborepo and Python services. Install dependencies first, then:

```bash
pnpm install
pnpm dev
```

For API-only development:

```bash
cd apps/api/core
python3 -m venv .venv
source .venv/bin/activate
pip install -e .
uvicorn app.main:app --reload
```

