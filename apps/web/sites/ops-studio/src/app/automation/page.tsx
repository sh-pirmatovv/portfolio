import { GlassCard, MetricCard, SectionHeading } from "@portfolio/ui";

import { automationCards, getOpsStudioData } from "../lib/ops-data";

export default async function AutomationPage() {
  const { overview } = await getOpsStudioData();

  return (
    <main className="min-h-screen px-6 py-8 md:px-10 xl:px-16">
      <div className="mx-auto max-w-7xl">
        <GlassCard>
          <SectionHeading
            eyebrow="Automation mesh"
            title="Bot, parser, and core working as one slice."
            description="This screen exposes the operational automation layer that feeds Ops Studio, making the product feel like part of a wider ecosystem instead of a standalone landing page."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <MetricCard label="Observed services" value={String(overview.heartbeats.length)} detail="Services currently visible in the dashboard response" />
            <MetricCard label="Recent events" value={String(overview.activity.length)} detail="Events tracked across monitoring activity history" />
            <MetricCard label="Uptime" value={overview.snapshot.uptime} detail="Current backend runtime uptime surfaced to the app layer" />
          </div>
        </GlassCard>

        <section className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {automationCards.map((item) => (
            <article key={item.name} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{item.type}</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-100">{item.name}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-400">{item.effect}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.24em] text-slate-500">Cadence · {item.cadence}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
