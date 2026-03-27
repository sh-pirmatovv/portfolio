import { SiteShowcase } from "@portfolio/ui";

export default function Page() {
  return <SiteShowcase eyebrow="Education operations suite" title="Academy OS" description="An education platform focused on learner progression, instructor visibility, and structured academic operations." metrics={[{ label: "Completion rate", value: "89.2%", detail: "Program completion across cohorts" }, { label: "Mentor tickets", value: "62", detail: "Support conversations in progress" }, { label: "Content sync", value: "14m", detail: "Lesson update propagation window" }]} features={["Learner progress rails with cohort segmentation", "Instructor-side review and intervention views", "Automated reminders via companion Telegram bot"]} />;
}

