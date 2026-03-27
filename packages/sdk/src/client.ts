import type {
  AuthMe,
  AuthSession,
  DashboardActivityResponse,
  DashboardOverview,
  DashboardProjectsResponse,
  DashboardServicesResponse,
  HealthResponse,
  PlatformStatus,
  Project,
  ShowcaseProjectCard,
  UsageSnapshot
} from "./types";

const defaultBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

type RequestOptions = {
  method?: "GET" | "POST";
  body?: unknown;
  headers?: HeadersInit;
};

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const response = await fetch(`${defaultBaseUrl}${path}`, {
    method: options.method ?? "GET",
    body: options.body ? JSON.stringify(options.body) : undefined,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {})
    },
    next: { revalidate: 60 }
  });

  if (!response.ok) {
    throw new Error(`Request failed for ${path}`);
  }

  return (await response.json()) as T;
}

export const portfolioApi = {
  getProjects: () => request<ShowcaseProjectCard[]>("/api/public/projects"),
  getProject: (slug: string) => request<Project>(`/api/public/projects/${slug}`),
  getOverview: () => request<UsageSnapshot>("/api/public/overview"),
  getPlatform: () => request<PlatformStatus>("/api/public/platform"),
  getHealth: () => request<HealthResponse>("/health"),
  getDashboardOverview: (sessionToken?: string) =>
    request<DashboardOverview>("/api/internal/dashboard/overview", {
      headers: sessionToken ? { "x-session-token": sessionToken } : undefined
    }),
  getDashboardServices: (sessionToken?: string) =>
    request<DashboardServicesResponse>("/api/internal/dashboard/services", {
      headers: sessionToken ? { "x-session-token": sessionToken } : undefined
    }),
  getDashboardProjects: (sessionToken?: string) =>
    request<DashboardProjectsResponse>("/api/internal/dashboard/projects", {
      headers: sessionToken ? { "x-session-token": sessionToken } : undefined
    }),
  getDashboardActivity: (sessionToken?: string) =>
    request<DashboardActivityResponse>("/api/internal/dashboard/activity", {
      headers: sessionToken ? { "x-session-token": sessionToken } : undefined
    }),
  login: (username: string, password: string) =>
    request<AuthSession>("/api/auth/login", {
      method: "POST",
      body: { username, password }
    }),
  me: (sessionToken: string) =>
    request<AuthMe>("/api/auth/me", {
      headers: { "x-session-token": sessionToken }
    })
};
