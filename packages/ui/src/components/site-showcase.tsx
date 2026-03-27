import { GlassCard } from "./glass-card";
import { SectionHeading } from "./section-heading";

type SiteShowcaseProps = {
  eyebrow: string;
  title: string;
  description: string;
  metrics: Array<{ label: string; value: string; detail: string }>;
  features: string[];
};

export function SiteShowcase({ eyebrow, title, description, metrics, features }: SiteShowcaseProps) {
  return (
    <main className="min-h-screen px-6 py-8 md:px-10 xl:px-16">
      <div className="mx-auto max-w-7xl">
        <GlassCard>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">{eyebrow}</p>
          <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight text-white md:text-6xl">{title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">{description}</p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-[24px] border border-white/10 bg-black/25 p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">{metric.label}</p>
                <p className="mt-4 text-3xl font-semibold text-slate-50">{metric.value}</p>
                <p className="mt-3 text-sm text-slate-400">{metric.detail}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <section className="mt-12 grid gap-6 lg:grid-cols-[1fr_0.95fr]">
          <GlassCard>
            <SectionHeading
              eyebrow="Product logic"
              title="Designed as a believable operating surface."
              description="Every showcase site is built as a portfolio-realistic MVP with metrics hooks, internal structure, and a distinct business narrative."
            />
          </GlassCard>
          <GlassCard eyebrow="Capabilities" title="Core flows">
            <ul className="space-y-3 text-sm leading-7 text-slate-300">
              {features.map((feature) => (
                <li key={feature} className="rounded-[20px] border border-white/10 bg-white/[0.03] px-4 py-3">
                  {feature}
                </li>
              ))}
            </ul>
          </GlassCard>
        </section>
      </div>
    </main>
  );
}
