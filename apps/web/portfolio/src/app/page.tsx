import Link from "next/link";
import { ActivityTimeline, GlassCard, MetricCard, ProjectGrid, SectionHeading, StatusBadge } from "@portfolio/ui";

import { getPortfolioHomeData, portfolioCopy } from "./lib/portfolio-data";

export default async function PortfolioHomePage() {
  const { platform, health, overview, projects, events } = await getPortfolioHomeData();
  const featuredProjects = projects.filter((project) => ["portfolio", "website", "dashboard"].includes(project.category));
  const categoryCounts = [
    { value: String(platform.topology.websites), label: "Web surfaces", detail: "Portfolio, monitoring, and business products" },
    { value: String(platform.topology.bots), label: "Telegram bots", detail: "Customer, operations, and alerting automations" },
    { value: String(platform.topology.parsers), label: "Parsers", detail: "Collectors and automation nodes feeding metrics" },
    { value: String(platform.topology.backendServices), label: "Shared core", detail: "Registry, auth, health, and metrics ingestion" }
  ];

  return (
    <main className="min-h-screen px-6 py-8 text-slate-100 md:px-10 xl:px-16">
      <div className="mx-auto max-w-7xl">
        <header className="grid gap-8 lg:grid-cols-[1.35fr_0.9fr]">
          <GlassCard className="min-h-[520px]">
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs uppercase tracking-[0.4em] text-slate-400">{portfolioCopy.heroEyebrow}</p>
              <StatusBadge status={health.status as "healthy" | "degraded" | "alert"} />
            </div>
            <h1 className="mt-8 max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight text-white md:text-7xl">
              {portfolioCopy.heroTitle}
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300">{portfolioCopy.heroDescription}</p>
            <div className="mt-10 grid gap-4 md:grid-cols-4">
              <MetricCard label="Active services" value={String(overview.activeServices)} detail="Live registry footprint across products and automations" />
              <MetricCard label="Automation runs" value={String(overview.automationRuns)} detail="Daily distributed jobs across portfolio systems" />
              <MetricCard label="RPM" value={String(overview.requestsPerMinute)} detail="Observed traffic through the shared platform core" />
              <MetricCard label="Uptime" value={overview.uptime} detail="Runtime uptime exposed from the backend command layer" />
            </div>
          </GlassCard>

          <GlassCard eyebrow="Live architecture" title="Mechanical ecosystem overview" className="min-h-[520px]">
            <div className="grid gap-4">
              {categoryCounts.map((item) => (
                <div key={item.label} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-3xl font-semibold text-slate-50">{item.value}</p>
                  <p className="mt-2 text-sm uppercase tracking-[0.28em] text-slate-400">{item.label}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-500">{item.detail}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </header>

        <section className="mt-20 grid gap-8 lg:grid-cols-[1fr_0.95fr]">
          <GlassCard>
            <SectionHeading
              eyebrow="Engineering philosophy"
              title="Visible structure. Controlled motion. Measurable behavior."
              description={portfolioCopy.philosophy}
            />
            <p className="mt-8 max-w-2xl text-base leading-7 text-slate-300">{portfolioCopy.architecture}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200">
                {platform.environment}
              </span>
              <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200">
                {platform.demoMode ? "Demo-enabled platform core" : "Live production mode"}
              </span>
              <Link href="/monitoring" className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-white/20">
                Open monitoring dashboard
              </Link>
            </div>
          </GlassCard>
          <GlassCard eyebrow="Operational pulse" title="Recent system activity">
            <ActivityTimeline items={events} />
          </GlassCard>
        </section>

        <section className="mt-20 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <GlassCard>
            <SectionHeading
              eyebrow="Command status"
              title="The portfolio is now platform-aware."
              description="The command hub reads platform topology, runtime health, and public metrics from the shared backend core while preserving fallback resilience."
            />
            <div className="mt-8 space-y-4">
              <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Storage topology</p>
                <p className="mt-4 text-sm leading-7 text-slate-300">{platform.storage.databaseUrl}</p>
                <p className="mt-2 text-sm leading-7 text-slate-300">{platform.storage.redisUrl}</p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Stale services</p>
                <p className="mt-4 text-4xl font-semibold text-white">{health.staleServices}</p>
                <p className="mt-3 text-sm text-slate-400">Services currently pushing the command layer into a degraded state.</p>
              </div>
            </div>
          </GlassCard>
          <GlassCard>
            <SectionHeading
              eyebrow="Systems catalog"
              title="A curated ecosystem of products, automations, and infrastructure."
              description="Each project card now behaves like an entry point into the command graph, with detail pages for stack, service relations, and metrics context."
            />
            <div className="mt-10">
              <ProjectGrid items={featuredProjects} />
            </div>
          </GlassCard>
        </section>
      </div>
    </main>
  );
}
