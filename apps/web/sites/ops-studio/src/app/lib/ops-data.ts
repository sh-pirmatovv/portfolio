import { portfolioApi } from "@portfolio/sdk";

export async function getOpsStudioData() {
  try {
    const [project, platform, overview] = await Promise.all([
      portfolioApi.getProject("ops-studio"),
      portfolioApi.getPlatform(),
      portfolioApi.getDashboardOverview()
    ]);

    return { project, platform, overview };
  } catch {
    return {
      project: {
        slug: "ops-studio",
        title: "Ops Studio",
        category: "website" as const,
        description: "A premium operational cockpit for teams that manage approvals, workflows, and execution throughput across distributed systems.",
        stack: ["Next.js", "TypeScript", "Tailwind", "FastAPI"],
        metricsLabel: "96.4% pipeline health",
        status: "healthy" as const,
        href: "/sites/ops-studio",
        companionBots: ["lead-qualifier"],
        companionParsers: ["lead-aggregator"]
      },
      platform: {
        appName: "Shahzodbek Premium Ecosystem API",
        environment: "development",
        demoMode: true,
        startedAt: new Date().toISOString(),
        storage: {
          databaseUrl: "postgresql+psycopg://portfolio:portfolio@localhost:5432/portfolio",
          redisUrl: "redis://localhost:6379/0",
          demoMode: true
        },
        topology: {
          websites: 11,
          bots: 10,
          parsers: 10,
          dashboards: 1,
          backendServices: 1
        }
      },
      overview: {
        snapshot: {
          activeServices: 33,
          automationRuns: 1284,
          requestsPerMinute: 486,
          uptime: "0h 0m"
        },
        heartbeats: [],
        activity: []
      }
    };
  }
}

export const leadQueue = [
  { account: "Northstar Logistics", stage: "Qualified", signal: "Need workflow automation and reporting", priority: "P1", owner: "A. Karimov" },
  { account: "Aster Commerce", stage: "Review", signal: "Multi-team approval bottleneck detected", priority: "P2", owner: "M. Saidov" },
  { account: "Helio Labs", stage: "Escalated", signal: "Executive dashboard launch requested", priority: "P1", owner: "D. Rakhimov" }
];

export const systemFlow = [
  { title: "Lead Aggregator", detail: "Collects high-fit B2B leads from demo sources and normalizes them for routing." },
  { title: "Lead Qualifier Bot", detail: "Scores inbound leads, prepares qualification notes, and pushes usage telemetry." },
  { title: "Ops Studio Console", detail: "Displays queue state, approvals, and execution pressure inside the premium operator UI." },
  { title: "Monitoring Core", detail: "Tracks heartbeat freshness, throughput, and recent incidents for the whole slice." }
];

export const accountCards = [
  { account: "Northstar Logistics", revenue: "$42k", pressure: "Escalated", blocker: "Approval routing across regional operators" },
  { account: "Aster Commerce", revenue: "$18k", pressure: "Stable", blocker: "Analytics handoff awaiting owner assignment" },
  { account: "Helio Labs", revenue: "$31k", pressure: "At risk", blocker: "Executive reporting deadline in 48h" }
];

export const automationCards = [
  { name: "lead-aggregator", type: "Parser", effect: "Normalizes 3 high-fit leads per run", cadence: "Every 30 min" },
  { name: "lead-qualifier", type: "Bot", effect: "Scores and summarizes top opportunities", cadence: "On demand + pulse" },
  { name: "monitoring-core", type: "Core", effect: "Captures heartbeat and usage events", cadence: "Continuous" }
];
