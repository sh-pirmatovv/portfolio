import { events, portfolioCopy, projects, usageSnapshot } from "@portfolio/content";
import { ActivityTimeline, GlassCard, MetricCard, ProjectGrid, SectionHeading } from "@portfolio/ui";

const featuredProjects = projects.filter((project) => ["portfolio", "website", "dashboard"].includes(project.category));

export default function PortfolioHomePage() {
  return (
    <main className="min-h-screen px-6 py-8 text-slate-100 md:px-10 xl:px-16">
      <div className="mx-auto max-w-7xl">
        <header className="grid gap-8 lg:grid-cols-[1.35fr_0.9fr]">
          <GlassCard className="min-h-[520px]">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">{portfolioCopy.heroEyebrow}</p>
            <h1 className="mt-8 max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight text-white md:text-7xl">
              {portfolioCopy.heroTitle}
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300">{portfolioCopy.heroDescription}</p>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <MetricCard label="Active services" value={String(usageSnapshot.activeServices)} detail="Web apps, bots, parsers, and core services" />
              <MetricCard label="Automation runs" value={String(usageSnapshot.automationRuns)} detail="Daily distributed jobs across portfolio systems" />
              <MetricCard label="Uptime" value={usageSnapshot.uptime} detail="Observed across the shared backend and frontend shell" />
            </div>
          </GlassCard>

          <GlassCard eyebrow="Live architecture" title="Mechanical ecosystem overview" className="min-h-[520px]">
            <div className="grid gap-4">
              {[
                ["11", "Web surfaces", "Portfolio, monitoring, and business products"],
                ["10", "Telegram bots", "Customer, operations, and alerting automations"],
                ["10", "Parsers", "Collectors and automation nodes feeding metrics"],
                ["1", "Shared core", "Registry, auth, health, and metrics ingestion"]
              ].map(([value, label, detail]) => (
                <div key={label} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-3xl font-semibold text-slate-50">{value}</p>
                  <p className="mt-2 text-sm uppercase tracking-[0.28em] text-slate-400">{label}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-500">{detail}</p>
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
          </GlassCard>
          <GlassCard eyebrow="Recent activity" title="Operational pulse">
            <ActivityTimeline items={events} />
          </GlassCard>
        </section>

        <section className="mt-20">
          <SectionHeading
            eyebrow="Systems catalog"
            title="A curated ecosystem of products, automations, and infrastructure."
            description="Every project is shaped as a believable digital system, linked to companion bots and parsers, and backed by shared metrics."
          />
          <div className="mt-10">
            <ProjectGrid items={featuredProjects} />
          </div>
        </section>
      </div>
    </main>
  );
}

