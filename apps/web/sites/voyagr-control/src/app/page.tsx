import { SiteShowcase } from "@portfolio/ui";

export default function Page() {
  return <SiteShowcase eyebrow="Travel intelligence portal" title="Voyagr Control" description="A hospitality operations layer for reservation flow, occupancy analysis, and rate-aware commercial decision making." metrics={[{ label: "Occupancy insight", value: "87.1%", detail: "Projected fill rate across properties" }, { label: "Rate shifts", value: "19", detail: "Detected market changes today" }, { label: "Reservations", value: "264", detail: "Confirmed guest flows in system" }]} features={["Reservation command center with occupancy forecasting", "Travel-rate parser inputs for pricing awareness", "Guest onboarding and service workflow views"]} />;
}
