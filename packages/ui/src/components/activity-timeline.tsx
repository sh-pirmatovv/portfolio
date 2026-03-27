type ActivityItem = {
  title: string;
  detail: string;
  timestamp: string;
  state: "healthy" | "degraded" | "alert";
};

const stateClasses = {
  healthy: "bg-emerald-400",
  degraded: "bg-amber-400",
  alert: "bg-rose-400"
} as const;

export function ActivityTimeline({ items }: { items: ActivityItem[] }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={`${item.title}-${item.timestamp}`} className="flex gap-4 rounded-[24px] border border-white/10 bg-black/25 p-4">
          <span className={`mt-1 h-2.5 w-2.5 rounded-full ${stateClasses[item.state]}`} />
          <div>
            <p className="text-sm font-medium text-slate-100">{item.title}</p>
            <p className="mt-1 text-sm text-slate-400">{item.detail}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.28em] text-slate-500">{item.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

