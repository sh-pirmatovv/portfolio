import type { PropsWithChildren } from "react";

type GlassCardProps = PropsWithChildren<{
  title?: string;
  eyebrow?: string;
  className?: string;
}>;

export function GlassCard({ title, eyebrow, className = "", children }: GlassCardProps) {
  return (
    <section
      className={`relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_80px_rgba(4,7,11,0.45)] backdrop-blur-xl ${className}`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.10),rgba(255,255,255,0.02))]" />
      <div className="relative z-10">
        {eyebrow ? <p className="mb-2 text-xs uppercase tracking-[0.35em] text-slate-400">{eyebrow}</p> : null}
        {title ? <h3 className="text-xl font-semibold text-slate-100">{title}</h3> : null}
        <div className="mt-4">{children}</div>
      </div>
    </section>
  );
}

