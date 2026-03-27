import { SiteShowcase } from "@portfolio/ui";

export default function Page() {
  return <SiteShowcase eyebrow="Ecommerce analytics studio" title="Commerce Intelligence" description="A luxury analytics environment for brands that need margin, cohort, and pricing clarity without noisy dashboards." metrics={[{ label: "GMV analyzed", value: "$1.28M", detail: "Demo revenue under observation" }, { label: "SKU watch", value: "1.4k", detail: "Catalog entries monitored" }, { label: "Price drift", value: "12", detail: "Competitor changes flagged today" }]} features={["Margin and cohort lenses with controlled data density", "Pricing watch streams from parser services", "Brand-grade reporting surfaces for operator teams"]} />;
}

