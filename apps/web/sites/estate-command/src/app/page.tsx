import { SiteShowcase } from "@portfolio/ui";

export default function Page() {
  return <SiteShowcase eyebrow="Real estate lead system" title="Estate Command" description="A premium listings and lead pipeline system that blends discovery, alerts, and broker-side operational control." metrics={[{ label: "Active alerts", value: "312", detail: "Client-facing property triggers" }, { label: "Lead velocity", value: "27/day", detail: "Qualified inbound opportunities" }, { label: "Parser health", value: "Degraded", detail: "Fallback extractor active for one source" }]} features={["Luxury listing views with broker workflow hooks", "Property alert subscriptions and routing logic", "Live parser-backed inventory monitoring"]} />;
}

