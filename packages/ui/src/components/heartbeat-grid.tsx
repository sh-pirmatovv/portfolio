import type { ServiceHeartbeat } from "@portfolio/sdk";
import { StatusBadge } from "./status-badge";

export function HeartbeatGrid({ items }: { items: ServiceHeartbeat[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((heartbeat) => (
        <div key={heartbeat.service} className="rounded-[24px] border border-white/10 bg-black/20 p-4">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-medium text-slate-100">{heartbeat.service}</p>
            <StatusBadge status={heartbeat.status} />
          </div>
          <p className="mt-3 text-xs uppercase tracking-[0.28em] text-slate-500">{heartbeat.category}</p>
          <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
            <span>Seen {heartbeat.lastSeen}</span>
            <span>{heartbeat.latencyMs} ms</span>
          </div>
        </div>
      ))}
    </div>
  );
}

