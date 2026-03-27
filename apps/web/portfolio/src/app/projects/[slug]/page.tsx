import { notFound } from "next/navigation";
import { projects } from "@portfolio/content";
import { GlassCard, SectionHeading } from "@portfolio/ui";

type Params = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default function ProjectDetailPage({ params }: Params) {
  const project = projects.find((entry) => entry.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen px-6 py-8 md:px-10 xl:px-16">
      <div className="mx-auto max-w-6xl">
        <GlassCard>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">{project.category}</p>
          <h1 className="mt-6 text-5xl font-semibold tracking-tight text-white">{project.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">{project.description}</p>
        </GlassCard>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <GlassCard>
            <SectionHeading
              eyebrow="System role"
              title="Designed as a visible component in a larger intelligent stack."
              description="Each portfolio project is linked to metrics collection, service health, and companion automations to demonstrate believable operational depth."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              {project.stack.map((item) => (
                <span key={item} className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200">
                  {item}
                </span>
              ))}
            </div>
          </GlassCard>

          <GlassCard eyebrow="Companions" title="Service graph">
            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Bots</p>
                <p className="mt-2 text-sm text-slate-200">{project.companionBots.join(", ") || "No direct bot mapping"}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Parsers</p>
                <p className="mt-2 text-sm text-slate-200">{project.companionParsers.join(", ") || "No direct parser mapping"}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Metrics</p>
                <p className="mt-2 text-sm text-slate-200">{project.metricsLabel}</p>
              </div>
            </div>
          </GlassCard>
        </section>
      </div>
    </main>
  );
}

