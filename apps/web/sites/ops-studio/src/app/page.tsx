import { portfolioApi } from "@portfolio/sdk";
import { GlassCard, MetricCard, SectionHeading, StatusBadge } from "@portfolio/ui";

async function getOpsStudioData() {
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

const leadQueue = [
  { account: "Northstar Logistics", stage: "Qualified", signal: "Need workflow automation and reporting", priority: "P1" },
  { account: "Aster Commerce", stage: "Review", signal: "Multi-team approval bottleneck detected", priority: "P2" },
  { account: "Helio Labs", stage: "Escalated", signal: "Executive dashboard launch requested", priority: "P1" }
];

const systemFlow = [
  { title: "Lead Aggregator", detail: "Collects high-fit B2B leads from demo sources and normalizes them for routing." },
  { title: "Lead Qualifier Bot", detail: "Scores inbound leads, prepares qualification notes, and pushes usage telemetry." },
  { title: "Ops Studio Console", detail: "Displays queue state, approvals, and execution pressure inside the premium operator UI." },
  { title: "Monitoring Core", detail: "Tracks heartbeat freshness, throughput, and recent incidents for the whole slice." }
];

export default async function Page() {
  const { project, platform, overview } = await getOpsStudioData();

  return (
    <main className="min-h-screen px-6 py-8 md:px-10 xl:px-16">
      <div className="mx-auto max-w-7xl">
        <header className="grid gap-8 lg:grid-cols-[1.25fr_0.95fr]">
          <GlassCard>
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">B2B operations SaaS</p>
              <StatusBadge status={project.status} />
            </div>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight text-white md:text-6xl">{project.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">{project.description}</p>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <MetricCard label="Workflow health" value="96.4%" detail="Cross-team pipeline success rate across qualified operational flows" />
              <MetricCard label="Lead velocity" value="184" detail="New records routed by the parser and bot slice this week" />
              <MetricCard label="Lead time" value="4.2h" detail="Median cycle time from lead ingestion to operator action" />
            </div>
          </GlassCard>

          <GlassCard eyebrow="Vertical slice" title="Connected services">
            <div className="space-y-4">
              {[
                ["Website", "Ops Studio", "Command surface for approvals, queue visibility, and execution flow."],
                ["Bot", "Lead Qualifier", "Qualification assistant that emits usage and heartbeat telemetry."],
                ["Parser", "Lead Aggregator", "Source collector feeding normalized lead candidates into the slice."],
                ["Core", platform.appName, "Shared registry, metrics ingestion, and operator monitoring layer."]
              ].map(([eyebrow, title, detail]) => (
                <div key={title} className="rounded-[24px] border border-white/10 bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-500">{eyebrow}</p>
                  <p className="mt-3 text-lg font-semibold text-slate-100">{title}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{detail}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </header>

        <section className="mt-14 grid gap-6 lg:grid-cols-[1fr_0.95fr]">
          <GlassCard>
            <SectionHeading
              eyebrow="Operator queue"
              title="Qualified work, presented like a control surface."
              description="Ops Studio is no longer just a themed card. This slice models a realistic operator queue driven by companion automation services and shared metrics."
            />
            <div className="mt-8 space-y-4">
              {leadQueue.map((item) => (
                <div key={item.account} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-slate-500">{item.priority}</p>
                      <h3 className="mt-2 text-xl font-semibold text-slate-100">{item.account}</h3>
                    </div>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-300">{item.stage}</span>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-400">{item.signal}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard eyebrow="Flow map" title="How this slice moves">
            <div className="space-y-4">
              {systemFlow.map((item, index) => (
                <div key={item.title} className="rounded-[24px] border border-white/10 bg-black/20 p-5">
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Step {index + 1}</p>
                  <h3 className="mt-3 text-lg font-semibold text-slate-100">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{item.detail}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </section>

        <section className="mt-14 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <GlassCard>
            <SectionHeading
              eyebrow="Platform context"
              title="Shared core visibility"
              description="This product surface is intentionally built to feel like one visible gear inside a larger instrument."
            />
            <div className="mt-8 space-y-4">
              <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Metrics summary</p>
                <p className="mt-4 text-lg text-slate-100">{project.metricsLabel}</p>
                <p className="mt-3 text-sm text-slate-400">The shared backend exposes this as the narrative KPI for the website node.</p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Companion services</p>
                <p className="mt-4 text-sm text-slate-300">Bot: {project.companionBots.join(", ")}</p>
                <p className="mt-2 text-sm text-slate-300">Parser: {project.companionParsers.join(", ")}</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <SectionHeading
              eyebrow="Slice telemetry"
              title="Current platform pressure"
              description="Even the showcase slice should read as something measurable and connected to the wider system."
            />
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <MetricCard label="Active services" value={String(overview.snapshot.activeServices)} detail="Current services visible to the shared registry layer" />
              <MetricCard label="RPM" value={String(overview.snapshot.requestsPerMinute)} detail="Traffic currently observed by the backend core" />
              <MetricCard label="Uptime" value={overview.snapshot.uptime} detail="Backend runtime uptime visible to monitoring and portfolio surfaces" />
            </div>
          </GlassCard>
        </section>
      </div>
    </main>
  );
}
