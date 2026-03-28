type ProjectGridItem = {
  slug: string;
  title: string;
  category: string;
  description: string;
  stack: string[];
  status: string;
};

export function ProjectGrid({ items }: { items: ProjectGridItem[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <a key={item.slug} href={`/projects/${item.slug}`}>
          <article className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5 transition-transform duration-300 hover:-translate-y-1">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">{item.category}</p>
                <h3 className="mt-3 text-xl font-semibold text-slate-100">{item.title}</h3>
              </div>
              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-emerald-300">
                {item.status}
              </span>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-400">{item.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {item.stack.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
                  {tag}
                </span>
              ))}
            </div>
          </article>
        </a>
      ))}
    </div>
  );
}
