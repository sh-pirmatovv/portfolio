type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs uppercase tracking-[0.35em] text-slate-400">{eyebrow}</p>
      <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-50 md:text-5xl">{title}</h2>
      <p className="mt-5 text-base leading-7 text-slate-300">{description}</p>
    </div>
  );
}

