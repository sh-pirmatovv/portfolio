export type ProjectCategory = "portfolio" | "website" | "bot" | "parser" | "dashboard" | "backend";

export type HealthState = "healthy" | "degraded" | "alert";

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  description: string;
  stack: string[];
  metricsLabel: string;
  status: HealthState;
  href: string;
  companionBots: string[];
  companionParsers: string[];
};

export type ServiceHeartbeat = {
  service: string;
  category: ProjectCategory;
  status: HealthState;
  lastSeen: string;
  latencyMs: number;
};

export type UsageSnapshot = {
  activeServices: number;
  automationRuns: number;
  requestsPerMinute: number;
  uptime: string;
};

export type DashboardOverview = {
  snapshot: UsageSnapshot;
  heartbeats: ServiceHeartbeat[];
  activity: MetricEvent[];
};

export type MetricEvent = {
  id: string;
  title: string;
  detail: string;
  timestamp: string;
  state: HealthState;
};

export type ShowcaseProjectCard = Pick<Project, "slug" | "title" | "category" | "description" | "stack" | "status">;

