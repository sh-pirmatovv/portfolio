import type { DashboardOverview, MetricEvent, Project, ServiceHeartbeat, UsageSnapshot } from "@portfolio/sdk";

const websites: Project[] = [
  {
    slug: "portfolio-command",
    title: "Portfolio Command Hub",
    category: "portfolio",
    description: "Cinematic flagship portfolio presenting Shahzodbek as a systems architect-builder.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    metricsLabel: "22.8k showcase sessions",
    status: "healthy",
    href: "/",
    companionBots: ["portfolio-concierge"],
    companionParsers: ["market-digest"]
  },
  {
    slug: "ops-studio",
    title: "Ops Studio",
    category: "website",
    description: "B2B operations cockpit with service orchestration, KPI rails, and pipeline visibility.",
    stack: ["Next.js", "Recharts", "shadcn/ui"],
    metricsLabel: "96.4% pipeline health",
    status: "healthy",
    href: "/sites/ops-studio",
    companionBots: ["lead-qualifier"],
    companionParsers: ["lead-aggregator"]
  },
  {
    slug: "dispatch-grid",
    title: "Dispatch Grid",
    category: "website",
    description: "Luxury logistics control surface with route intelligence and fleet heartbeat monitoring.",
    stack: ["Next.js", "TypeScript", "Redis"],
    metricsLabel: "184 active deliveries",
    status: "healthy",
    href: "/sites/dispatch-grid",
    companionBots: ["order-support"],
    companionParsers: ["travel-rates"]
  },
  {
    slug: "commerce-intelligence",
    title: "Commerce Intelligence",
    category: "website",
    description: "Premium ecommerce analytics studio with revenue lenses, cohort tracking, and pricing watch.",
    stack: ["Next.js", "FastAPI", "PostgreSQL"],
    metricsLabel: "$1.28M GMV analyzed",
    status: "healthy",
    href: "/sites/commerce-intelligence",
    companionBots: ["finance-notifier"],
    companionParsers: ["pricing-tracker"]
  },
  {
    slug: "tableflow",
    title: "TableFlow",
    category: "website",
    description: "Restaurant command system covering bookings, kitchen cadence, and guest satisfaction signals.",
    stack: ["Next.js", "Redis", "Recharts"],
    metricsLabel: "428 bookings synced",
    status: "healthy",
    href: "/sites/tableflow",
    companionBots: ["order-support"],
    companionParsers: ["review-monitor"]
  },
  {
    slug: "medaxis",
    title: "MedAxis",
    category: "website",
    description: "Medical intake and scheduling portal built around reliability, privacy, and process clarity.",
    stack: ["Next.js", "TypeScript", "FastAPI"],
    metricsLabel: "1.8k patient actions",
    status: "healthy",
    href: "/sites/medaxis",
    companionBots: ["appointment-booker"],
    companionParsers: ["vacancy-monitor"]
  },
  {
    slug: "estate-command",
    title: "Estate Command",
    category: "website",
    description: "Real estate lead and listing platform with premium search, alerts, and pipeline management.",
    stack: ["Next.js", "PostgreSQL", "Redis"],
    metricsLabel: "312 active property alerts",
    status: "degraded",
    href: "/sites/estate-command",
    companionBots: ["property-alerts"],
    companionParsers: ["property-listings"]
  },
  {
    slug: "academy-os",
    title: "Academy OS",
    category: "website",
    description: "Education operations suite for curriculum control, learner progress, and support workflows.",
    stack: ["Next.js", "TypeScript", "Recharts"],
    metricsLabel: "89.2% course completion",
    status: "healthy",
    href: "/sites/academy-os",
    companionBots: ["learning-assistant"],
    companionParsers: ["market-digest"]
  },
  {
    slug: "creator-ops",
    title: "Creator Ops",
    category: "website",
    description: "Campaign command center for creators and media teams with audience, deal, and content telemetry.",
    stack: ["Next.js", "FastAPI", "Redis"],
    metricsLabel: "73 campaign automations",
    status: "healthy",
    href: "/sites/creator-ops",
    companionBots: ["campaign-reporting"],
    companionParsers: ["trend-collector"]
  },
  {
    slug: "finpulse",
    title: "FinPulse",
    category: "website",
    description: "Fintech pricing and reporting dashboard with compliance-style structure and alerting.",
    stack: ["Next.js", "Recharts", "PostgreSQL"],
    metricsLabel: "41 pricing models tracked",
    status: "healthy",
    href: "/sites/finpulse",
    companionBots: ["finance-notifier"],
    companionParsers: ["tender-watch"]
  },
  {
    slug: "voyagr-control",
    title: "Voyagr Control",
    category: "website",
    description: "Hospitality and travel intelligence portal with reservations, occupancy, and rate monitoring.",
    stack: ["Next.js", "TypeScript", "Redis"],
    metricsLabel: "87.1% occupancy insight",
    status: "healthy",
    href: "/sites/voyagr-control",
    companionBots: ["client-onboarding"],
    companionParsers: ["travel-rates"]
  }
];

const bots: Project[] = [
  "portfolio-concierge",
  "lead-qualifier",
  "order-support",
  "appointment-booker",
  "property-alerts",
  "learning-assistant",
  "campaign-reporting",
  "finance-notifier",
  "ops-incident",
  "client-onboarding"
].map((slug, index) => ({
  slug,
  title: slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" "),
  category: "bot" as const,
  description: "Telegram automation node connected to the shared metrics and registry core.",
  stack: ["Python", "aiogram", "Redis"],
  metricsLabel: `${110 + index * 12} interactions/hour`,
  status: index === 8 ? "alert" : "healthy",
  href: `/bots/${slug}`,
  companionBots: [],
  companionParsers: []
}));

const parsers: Project[] = [
  "pricing-tracker",
  "lead-aggregator",
  "property-listings",
  "vacancy-monitor",
  "market-digest",
  "review-monitor",
  "travel-rates",
  "catalog-sync",
  "tender-watch",
  "trend-collector"
].map((slug, index) => ({
  slug,
  title: slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" "),
  category: "parser" as const,
  description: "Portfolio-grade parser or automation service with heartbeat and job telemetry support.",
  stack: ["Python", "httpx", "BeautifulSoup"],
  metricsLabel: `${42 + index * 9} runs/day`,
  status: index === 2 ? "degraded" : "healthy",
  href: `/parsers/${slug}`,
  companionBots: [],
  companionParsers: []
}));

export const projects: Project[] = [
  ...websites,
  {
    slug: "monitoring-dashboard",
    title: "Monitoring Dashboard",
    category: "dashboard",
    description: "Internal operations surface for heartbeat freshness, incidents, and service health.",
    stack: ["Next.js", "Recharts", "Auth"],
    metricsLabel: "34 services monitored",
    status: "healthy",
    href: "/monitoring",
    companionBots: ["ops-incident"],
    companionParsers: ["catalog-sync"]
  },
  {
    slug: "backend-core",
    title: "Backend Core",
    category: "backend",
    description: "Central FastAPI registry, metrics, auth, and health aggregation core.",
    stack: ["FastAPI", "PostgreSQL", "Redis"],
    metricsLabel: "5.8ms median ingest",
    status: "healthy",
    href: "/api",
    companionBots: [],
    companionParsers: []
  },
  ...bots,
  ...parsers
];

export const usageSnapshot: UsageSnapshot = {
  activeServices: 34,
  automationRuns: 1284,
  requestsPerMinute: 486,
  uptime: "99.982%"
};

export const heartbeats: ServiceHeartbeat[] = projects.slice(0, 14).map((project, index) => ({
  service: project.slug,
  category: project.category,
  status: project.status,
  lastSeen: `${index + 1}m ago`,
  latencyMs: 12 + index * 3
}));

export const events: MetricEvent[] = [
  {
    id: "evt_001",
    title: "Monitoring sweep completed",
    detail: "All core APIs responded within SLO during the last distributed check window.",
    timestamp: "08:48",
    state: "healthy"
  },
  {
    id: "evt_002",
    title: "Estate Command parser drift",
    detail: "Property listing parser reported selector mismatch and switched to fallback extractor.",
    timestamp: "08:31",
    state: "degraded"
  },
  {
    id: "evt_003",
    title: "Ops incident bot alert sent",
    detail: "Telegram incident channel received a degraded service notification for parser latency.",
    timestamp: "08:12",
    state: "alert"
  }
];

export const dashboardOverview: DashboardOverview = {
  snapshot: usageSnapshot,
  heartbeats,
  activity: events
};

