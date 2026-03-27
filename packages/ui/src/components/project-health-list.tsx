import type { DashboardProject } from "@portfolio/sdk";
import { StatusBadge } from "./status-badge";

export function ProjectHealthList({ items }: { items: DashboardProject[] }) {
  return (
    <div className="space-y-4">
      {items.map(({ project, latestHeartbeat, recentEvents }) => (
        <article key={project.slug} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">{project.category}</p>
              <h3 className="mt-3 text-xl font-semibold text-slate-100">{project.title}</h3>
            </div>
            <StatusBadge status={(latestHeartbeat?.status ?? project.status) as "healthy" | "degraded" | "alert"} />
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-400">{project.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span key={item} className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
                {item}
              </span>
            ))}
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-[0.7fr_1fr]">
            <div className="rounded-[20px] border border-white/10 bg-black/25 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Latest heartbeat</p>
              <p className="mt-3 text-sm text-slate-200">
                {latestHeartbeat ? `${latestHeartbeat.lastSeen} at ${latestHeartbeat.latencyMs} ms` : "No heartbeat yet"}
              </p>
            </div>
            <div className="rounded-[20px] border border-white/10 bg-black/25 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Recent activity</p>
              <div className="mt-3 space-y-2">
                {recentEvents.length ? (
                  recentEvents.map((event) => (
                    <p key={event.id} className="text-sm text-slate-300">
                      {event.timestamp} · {event.title}
                    </p>
                  ))
                ) : (
                  <p className="text-sm text-slate-500">No linked events yet.</p>
                )}
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

