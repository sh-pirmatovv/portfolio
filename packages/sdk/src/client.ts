import type { DashboardOverview, Project, ShowcaseProjectCard, UsageSnapshot } from "./types";

const defaultBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${defaultBaseUrl}${path}`, {
    headers: { "Content-Type": "application/json" },
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
  getDashboardOverview: () => request<DashboardOverview>("/api/internal/dashboard/overview")
};

