import { SiteShowcase } from "@portfolio/ui";

export default function Page() {
  return <SiteShowcase eyebrow="Medical booking portal" title="MedAxis" description="A clear, dependable intake and scheduling portal built to communicate care readiness and process confidence." metrics={[{ label: "Patient actions", value: "1.8k", detail: "Secure demo intake events" }, { label: "No-show risk", value: "4.1%", detail: "Predicted missed appointment rate" }, { label: "Intake completion", value: "91%", detail: "Structured form completion success" }]} features={["Appointment scheduling with operator review lane", "Structured intake forms and timeline states", "Operational notifications for care coordinators"]} />;
}

