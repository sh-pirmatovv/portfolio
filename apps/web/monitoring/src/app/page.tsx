import { dashboardOverview, events, projects } from "@portfolio/content";
import { portfolioApi } from "@portfolio/sdk";
import {
  ActivityTimeline,
  GlassCard,
  HeartbeatGrid,
  MetricCard,
  ProjectHealthList,
  SectionHeading,
  StatusBadge
} from "@portfolio/ui";

async function getMonitoringData() {
  try {
    const [platform, health, overview, projectGroups] = await Promise.all([
      portfolioApi.getPlatform(),
      portfolioApi.getHealth(),
      portfolioApi.getDashboardOverview(),
      portfolioApi.getDashboardProjects()
    ]);

    return {
      platform,
      health,
      overview,
      projectGroups
    };
  } catch {
    return {
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
      health: {
        status: "degraded",
        environment: "development",
        demoMode: true,
        activeSessions: 0,
        servicesObserved: dashboardOverview.heartbeats.length,
        staleServices: 2
      },
      overview: dashboardOverview,
      projectGroups: {
        projects: projects
          .filter((project) => ["website", "bot", "parser"].includes(project.category))
          .slice(0, 6)
          .map((project) => ({
            project,
            latestHeartbeat: dashboardOverview.heartbeats.find((heartbeat) => heartbeat.service === project.slug) ?? null,
            recentEvents: events.filter((event) => event.detail.toLowerCase().includes(project.slug.split("-")[0])).slice(0, 2)
          }))
      }
    };
  }
}

export default async function MonitoringPage() {
  const { platform, health, overview, projectGroups } = await getMonitoringData();

  return (
    <main className="min-h-screen px-6 py-8 md:px-10 xl:px-16">
      <div className="mx-auto max-w-7xl">
        <header className="grid gap-6 lg:grid-cols-[1.2fr_0.9fr]">
          <GlassCard>
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs uppercase tracking-[0.35em] text-emerald-300">Internal monitoring</p>
              <StatusBadge status={health.status as "healthy" | "degraded" | "alert"} />
            </div>
            <h1 className="mt-6 text-5xl font-semibold tracking-tight text-white">System health, heartbeat freshness, and operational pulse.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              This dashboard is now wired against the shared backend core and exposes platform metadata, service health, usage pressure, and project-linked diagnostics.
            </p>
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <MetricCard label="Active services" value={String(overview.snapshot.activeServices)} detail="Tracked via shared heartbeat contracts" />
              <MetricCard label="RPM" value={String(overview.snapshot.requestsPerMinute)} detail="Aggregated internal and showcase API traffic" />
              <MetricCard label="Sessions" value={String(health.activeSessions)} detail="Operator sessions currently active in the runtime layer" />
              <MetricCard label="Uptime" value={overview.snapshot.uptime} detail="Observed platform uptime from the backend runtime" />
            </div>
          </GlassCard>

          <GlassCard eyebrow="Platform core" title={platform.appName}>
            <div className="space-y-4 text-sm leading-7 text-slate-300">
              <p>
                Environment: <span className="text-slate-100">{platform.environment}</span>
              </p>
              <p>
                Mode: <span className="text-slate-100">{platform.demoMode ? "Demo-enabled" : "Live-only"}</span>
              </p>
              <p>
                Storage: <span className="text-slate-100">Postgres + Redis configured</span>
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="rounded-[20px] border border-white/10 bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Web surfaces</p>
                  <p className="mt-3 text-2xl font-semibold text-white">{platform.topology.websites}</p>
                </div>
                <div className="rounded-[20px] border border-white/10 bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Automation nodes</p>
                  <p className="mt-3 text-2xl font-semibold text-white">{platform.topology.bots + platform.topology.parsers}</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </header>

        <section className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <GlassCard>
            <SectionHeading
              eyebrow="Heartbeat matrix"
              title="Observed services"
              description="Freshness, latency, and status are now sourced from the backend monitoring contract rather than hard-coded screen data."
            />
            <div className="mt-8">
              <HeartbeatGrid items={overview.heartbeats} />
            </div>
          </GlassCard>

          <GlassCard eyebrow="Incident timeline" title="Recent activity">
            <ActivityTimeline items={overview.activity} />
          </GlassCard>
        </section>

        <section className="mt-14 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <GlassCard>
            <SectionHeading
              eyebrow="Platform pressure"
              title="Runtime posture"
              description="The monitoring surface now reflects runtime-level conditions from the backend core."
            />
            <div className="mt-8 space-y-4">
              <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Stale services</p>
                <p className="mt-4 text-4xl font-semibold text-white">{health.staleServices}</p>
                <p className="mt-3 text-sm text-slate-400">Services currently reported as drifting beyond the expected heartbeat window.</p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Observed services</p>
                <p className="mt-4 text-4xl font-semibold text-white">{health.servicesObserved}</p>
                <p className="mt-3 text-sm text-slate-400">Live heartbeat entries currently visible to the monitoring core.</p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Storage targets</p>
                <p className="mt-4 text-sm leading-7 text-slate-300">{platform.storage.databaseUrl}</p>
                <p className="mt-2 text-sm leading-7 text-slate-300">{platform.storage.redisUrl}</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <SectionHeading
              eyebrow="Project drilldown"
              title="Services mapped back to product surfaces."
              description="Each product surface can now be rendered alongside its latest heartbeat and recent related events from the shared backend core."
            />
            <div className="mt-8">
              <ProjectHealthList items={projectGroups.projects.slice(0, 6)} />
            </div>
          </GlassCard>
        </section>
      </div>
    </main>
  );
}
