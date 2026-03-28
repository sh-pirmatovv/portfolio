import Link from "next/link";
import { notFound } from "next/navigation";
import { GlassCard, SectionHeading, StatusBadge } from "@portfolio/ui";

import { getPortfolioProject, projects } from "../../lib/portfolio-data";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getPortfolioProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen px-6 py-8 md:px-10 xl:px-16">
      <div className="mx-auto max-w-6xl">
        <GlassCard>
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">{project.category}</p>
            <StatusBadge status={project.status} />
          </div>
          <h1 className="mt-6 text-5xl font-semibold tracking-tight text-white">{project.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">{project.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {project.stack.map((item) => (
              <span key={item} className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200">
                {item}
              </span>
            ))}
          </div>
        </GlassCard>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <GlassCard>
            <SectionHeading
              eyebrow="System role"
              title="Designed as a visible component in a larger intelligent stack."
              description="This detail view is now intended as a command-level project brief: what the surface does, how it fits into the ecosystem, and which automations are attached to it."
            />
            <div className="mt-8 rounded-[24px] border border-white/10 bg-black/20 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Metrics narrative</p>
              <p className="mt-3 text-lg text-slate-100">{project.metricsLabel}</p>
              <p className="mt-4 text-sm leading-7 text-slate-400">
                The portfolio command layer uses this metric label as a human-readable summary of why this project matters operationally.
              </p>
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
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Route</p>
                <p className="mt-2 text-sm text-slate-200">{project.href}</p>
              </div>
            </div>
          </GlassCard>
        </section>

        <section className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-white/20">
            Back to command hub
          </Link>
          <Link href="/monitoring" className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-white/20">
            Open monitoring
          </Link>
        </section>
      </div>
    </main>
  );
}
