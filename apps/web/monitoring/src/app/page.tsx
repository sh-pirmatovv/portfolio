import { dashboardOverview, projects } from "@portfolio/content";
import { ActivityTimeline, GlassCard, MetricCard, SectionHeading } from "@portfolio/ui";

const serviceCards = projects.filter((project) => ["website", "bot", "parser"].includes(project.category)).slice(0, 9);

export default function MonitoringPage() {
  return (
    <main className="min-h-screen px-6 py-8 md:px-10 xl:px-16">
      <div className="mx-auto max-w-7xl">
        <header className="grid gap-6 lg:grid-cols-[1.2fr_0.9fr]">
          <GlassCard>
            <p className="text-xs uppercase tracking-[0.35em] text-emerald-300">Internal monitoring</p>
            <h1 className="mt-6 text-5xl font-semibold tracking-tight text-white">System health, heartbeat freshness, and operational pulse.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              This dashboard is designed as the operator-facing lens for the entire portfolio ecosystem, combining live heartbeats, usage, incidents, and project-linked status.
            </p>
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <MetricCard label="Active services" value={String(dashboardOverview.snapshot.activeServices)} detail="Tracked via shared heartbeat contracts" />
              <MetricCard label="RPM" value={String(dashboardOverview.snapshot.requestsPerMinute)} detail="Aggregated internal and showcase API traffic" />
              <MetricCard label="Automation runs" value={String(dashboardOverview.snapshot.automationRuns)} detail="Bot and parser executions in the current window" />
              <MetricCard label="Uptime" value={dashboardOverview.snapshot.uptime} detail="Demo SLO for the shared backend core" />
            </div>
          </GlassCard>

          <GlassCard eyebrow="Access model" title="Secure operator surface">
            <div className="space-y-4 text-sm leading-7 text-slate-300">
              <p>Auth is intentionally lightweight for v1: credential login, protected dashboard routes, and internal-only data exposure.</p>
              <p>Public portfolio surfaces consume sanitized summary metrics while this dashboard can inspect service-level health states and recent incidents.</p>
            </div>
          </GlassCard>
        </header>

        <section className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <GlassCard>
            <SectionHeading
              eyebrow="Heartbeat matrix"
              title="Observed services"
              description="Freshness, latency, and service category snapshots are exposed through a shared monitoring contract."
            />
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {dashboardOverview.heartbeats.map((heartbeat) => (
                <div key={heartbeat.service} className="rounded-[24px] border border-white/10 bg-black/20 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-medium text-slate-100">{heartbeat.service}</p>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-300">
                      {heartbeat.status}
                    </span>
                  </div>
                  <p className="mt-3 text-xs uppercase tracking-[0.28em] text-slate-500">{heartbeat.category}</p>
                  <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
                    <span>Seen {heartbeat.lastSeen}</span>
                    <span>{heartbeat.latencyMs} ms</span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard eyebrow="Incident timeline" title="Recent activity">
            <ActivityTimeline items={dashboardOverview.activity} />
          </GlassCard>
        </section>

        <section className="mt-14">
          <SectionHeading
            eyebrow="Project drilldown"
            title="Services mapped back to product surfaces."
            description="Every app, bot, and parser is represented as a first-class system component with portfolio context and observable status."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {serviceCards.map((project) => (
              <div key={project.slug} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">{project.category}</p>
                <h3 className="mt-3 text-xl font-semibold text-slate-100">{project.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{project.description}</p>
                <p className="mt-4 text-sm text-emerald-200">{project.metricsLabel}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
