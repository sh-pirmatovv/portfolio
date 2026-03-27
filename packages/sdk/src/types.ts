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

export type StorageTargets = {
  databaseUrl: string;
  redisUrl: string;
  demoMode: boolean;
};

export type ServiceTopology = {
  websites: number;
  bots: number;
  parsers: number;
  dashboards: number;
  backendServices: number;
};

export type PlatformStatus = {
  appName: string;
  environment: string;
  demoMode: boolean;
  startedAt: string;
  storage: StorageTargets;
  topology: ServiceTopology;
};

export type MetricEvent = {
  id: string;
  title: string;
  detail: string;
  timestamp: string;
  state: HealthState;
};

export type ShowcaseProjectCard = Pick<Project, "slug" | "title" | "category" | "description" | "stack" | "status">;

export type AuthSession = {
  token: string;
  username: string;
  expiresAt: string;
};

export type AuthMe = {
  username: string;
  issuedAt: string;
  expiresAt: string;
};

export type DashboardProject = {
  project: Project;
  latestHeartbeat: ServiceHeartbeat | null;
  recentEvents: MetricEvent[];
};

export type DashboardServicesResponse = {
  services: ServiceHeartbeat[];
};

export type DashboardProjectsResponse = {
  projects: DashboardProject[];
};

export type DashboardActivityResponse = {
  activity: MetricEvent[];
};

export type HealthResponse = {
  status: string;
  environment: string;
  demoMode: boolean;
  activeSessions: number;
  servicesObserved: number;
  staleServices: number;
};
