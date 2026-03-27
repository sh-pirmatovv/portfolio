type StatusBadgeProps = {
  status: "healthy" | "degraded" | "alert";
};

const statusMap = {
  healthy: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
  degraded: "border-amber-400/20 bg-amber-400/10 text-amber-200",
  alert: "border-rose-400/20 bg-rose-400/10 text-rose-200"
} as const;

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.24em] ${statusMap[status]}`}>
      {status}
    </span>
  );
}

