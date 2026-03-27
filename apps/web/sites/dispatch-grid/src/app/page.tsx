import { SiteShowcase } from "@portfolio/ui";

export default function Page() {
  return <SiteShowcase eyebrow="Logistics control platform" title="Dispatch Grid" description="A route-aware control surface for dispatch teams who need vehicle status, delivery timing, and system reliability in one premium interface." metrics={[{ label: "Live routes", value: "184", detail: "Tracked distribution paths" }, { label: "Fleet uptime", value: "99.3%", detail: "Observed service readiness" }, { label: "Latency", value: "18ms", detail: "Median dispatch event delay" }]} features={["Dispatcher queue with route prioritization", "Fleet health overlays and delay escalation", "Shipment heartbeat reporting to shared backend core"]} />;
}

