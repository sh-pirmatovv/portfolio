type MetricCardProps = {
  label: string;
  value: string;
  detail: string;
};

export function MetricCard({ label, value, detail }: MetricCardProps) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-black/30 p-5 backdrop-blur-xl">
      <p className="text-xs uppercase tracking-[0.28em] text-slate-500">{label}</p>
      <p className="mt-4 text-4xl font-semibold tracking-tight text-slate-50">{value}</p>
      <p className="mt-3 text-sm text-slate-400">{detail}</p>
    </div>
  );
}

