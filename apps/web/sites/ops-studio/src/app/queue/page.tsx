import { GlassCard, MetricCard, SectionHeading } from "@portfolio/ui";

import { getOpsStudioData, leadQueue } from "../lib/ops-data";

export default async function QueuePage() {
  const { overview } = await getOpsStudioData();

  return (
    <main className="min-h-screen px-6 py-8 md:px-10 xl:px-16">
      <div className="mx-auto max-w-7xl">
        <GlassCard>
          <SectionHeading
            eyebrow="Queue control"
            title="Operational leads waiting for action."
            description="This screen models the day-to-day queue that an operator would actually work through after the parser and bot have done their first-pass triage."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <MetricCard label="Queue depth" value={String(leadQueue.length)} detail="Current qualified opportunities in the operator queue" />
            <MetricCard label="RPM" value={String(overview.snapshot.requestsPerMinute)} detail="Current platform traffic pressure across the slice" />
            <MetricCard label="Automation runs" value={String(overview.snapshot.automationRuns)} detail="Bot and parser executions feeding the queue" />
          </div>
        </GlassCard>

        <section className="mt-10 grid gap-4">
          {leadQueue.map((item) => (
            <div key={item.account} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{item.priority}</p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-100">{item.account}</h2>
                </div>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-300">{item.stage}</span>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-400">{item.signal}</p>
              <p className="mt-3 text-xs uppercase tracking-[0.22em] text-slate-500">Owner · {item.owner}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}

