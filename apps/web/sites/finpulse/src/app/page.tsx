import { SiteShowcase } from "@portfolio/ui";

export default function Page() {
  return <SiteShowcase eyebrow="Fintech reporting system" title="FinPulse" description="A premium pricing and reporting environment for finance-oriented operators who need confidence, traceability, and alert-driven oversight." metrics={[{ label: "Models tracked", value: "41", detail: "Pricing logic modules under watch" }, { label: "Alert volume", value: "8", detail: "Material threshold events today" }, { label: "Data freshness", value: "99.7%", detail: "Recent snapshot availability" }]} features={["Structured reporting panels with controlled density", "Pricing alerts and summary distribution", "Internal health hooks aligned with monitoring dashboard"]} />;
}

