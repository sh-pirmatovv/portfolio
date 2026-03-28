import { events, portfolioCopy, projects, usageSnapshot } from "@portfolio/content";
import { portfolioApi } from "@portfolio/sdk";

export async function getPortfolioHomeData() {
  try {
    const [platform, health, overview, liveProjects] = await Promise.all([
      portfolioApi.getPlatform(),
      portfolioApi.getHealth(),
      portfolioApi.getOverview(),
      portfolioApi.getProjects()
    ]);

    return {
      platform,
      health,
      overview,
      projects: liveProjects,
      events
    };
  } catch {
    return {
      platform: {
        appName: "Shahzodbek Premium Ecosystem API",
        environment: "development",
        demoMode: true,
        startedAt: new Date().toISOString(),
        storage: {
          databaseUrl: "postgresql+psycopg://portfolio:portfolio@localhost:5432/portfolio",
          redisUrl: "redis://localhost:6379/0",
          demoMode: true
        },
        topology: {
          websites: 11,
          bots: 10,
          parsers: 10,
          dashboards: 1,
          backendServices: 1
        }
      },
      health: {
        status: "degraded",
        environment: "development",
        demoMode: true,
        activeSessions: 0,
        servicesObserved: 6,
        staleServices: 2
      },
      overview: usageSnapshot,
      projects,
      events
    };
  }
}

export async function getPortfolioProject(slug: string) {
  try {
    return await portfolioApi.getProject(slug);
  } catch {
    return projects.find((project) => project.slug === slug) ?? null;
  }
}

export { portfolioCopy, projects };
