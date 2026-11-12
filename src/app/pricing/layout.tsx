import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AgentShield & RitualDev Pricing — Open Source ($0), Team CI ($19/seat) & Enterprise Fleet",
  description:
    "Transparent pricing for RitualDev AgentShield, DBShield, SkillPrism, Hosted Team Relay ($29/mo), Enterprise Fleet ($49/seat), and Private Compliance Packs ($199).",
  alternates: {
    canonical: "https://ritualdev.in/pricing/",
  },
  openGraph: {
    title: "AgentShield & RitualDev Defense Suite Pricing",
    description:
      "Clear pricing across Free OSS CLI ($0), Team & CI/CD Gate ($19/seat/mo), Hosted Relay ($29/mo), Enterprise Fleet ($49/seat/mo), and Private VPC.",
    url: "https://ritualdev.in/pricing/",
    siteName: "RitualDev",
    type: "website",
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
