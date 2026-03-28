import { GlassCard, SectionHeading, StatusBadge } from "@portfolio/ui";

import { accountCards } from "../lib/ops-data";

export default function AccountsPage() {
  return (
    <main className="min-h-screen px-6 py-8 md:px-10 xl:px-16">
      <div className="mx-auto max-w-7xl">
        <GlassCard>
          <SectionHeading
            eyebrow="Account health"
            title="High-value accounts under operational observation."
            description="This screen turns the slice into something closer to a believable SaaS product by showing account pressure, blockers, and revenue context."
          />
        </GlassCard>

        <section className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {accountCards.map((item) => (
            <article key={item.account} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Account</p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-100">{item.account}</h2>
                </div>
                <StatusBadge status={item.pressure === "Stable" ? "healthy" : item.pressure === "Escalated" ? "alert" : "degraded"} />
              </div>
              <p className="mt-4 text-sm text-slate-300">Revenue opportunity · {item.revenue}</p>
              <p className="mt-4 text-sm leading-7 text-slate-400">{item.blocker}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

