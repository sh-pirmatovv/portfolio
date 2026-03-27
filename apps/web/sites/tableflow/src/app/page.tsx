import { SiteShowcase } from "@portfolio/ui";

export default function Page() {
  return <SiteShowcase eyebrow="Restaurant operations" title="TableFlow" description="A refined guest and kitchen operations product for restaurants that care about cadence, throughput, and service quality." metrics={[{ label: "Bookings", value: "428", detail: "Live and scheduled reservations" }, { label: "Table turn", value: "46m", detail: "Average utilization cycle" }, { label: "Review pulse", value: "4.8", detail: "Aggregated sentiment score" }]} features={["Reservation timeline with dining-room orchestration", "Kitchen pacing and order status visibility", "Guest sentiment loops fed by review monitoring"]} />;
}

