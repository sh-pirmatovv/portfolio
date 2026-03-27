import { SiteShowcase } from "@portfolio/ui";

export default function Page() {
  return <SiteShowcase eyebrow="B2B operations SaaS" title="Ops Studio" description="A premium operational cockpit for teams that manage approvals, workflows, and execution throughput across distributed systems." metrics={[{ label: "Workflow health", value: "96.4%", detail: "Cross-team pipeline success rate" }, { label: "Automations", value: "184", detail: "Shared actions executed this week" }, { label: "Lead time", value: "4.2h", detail: "Median cycle time per request" }]} features={["Unified workflow queue with operator-assist layers", "Decision audit trail for premium B2B clients", "Live metrics hooks connected to central monitoring"]} />;
}

