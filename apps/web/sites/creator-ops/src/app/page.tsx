import { SiteShowcase } from "@portfolio/ui";

export default function Page() {
  return <SiteShowcase eyebrow="Media campaign operations" title="Creator Ops" description="A command system for creators and media teams managing campaigns, approvals, performance snapshots, and content delivery." metrics={[{ label: "Campaigns", value: "73", detail: "Active branded workflow automations" }, { label: "Response SLA", value: "22m", detail: "Median internal approval response" }, { label: "Trend watch", value: "58", detail: "New topics detected today" }]} features={["Campaign pipeline with approval and delivery states", "Audience and content telemetry surfaces", "Trend collector integration for rapid opportunity scanning"]} />;
}

