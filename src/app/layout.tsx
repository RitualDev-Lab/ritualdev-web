import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "RitualDev — Autonomous AI Agent Defense, Sandboxing & Zero-Leak Studio",
  description: "Enterprise-grade runtime secret defense, kernel sandboxing (Bubblewrap, Landlock, Seatbelt, AppContainer), database wire proxy, 96.7% token compaction, and offline-first software.",
  metadataBase: new URL("https://ritualdev.in"),
  alternates: {
    canonical: "/",
  },
  keywords: [
    "AI agent security",
    "kernel sandbox",
    "AgentShield",
    "DBShield",
    "SkillPrism",
    "DevShelf",
    "WebSecAuditor",
    "MCPBuilderKit",
    "Model Context Protocol",
    "Claude Code security",
    "Cursor AI sandbox",
    "Windsurf extension",
    "database guardrail",
    "token compaction",
    "prompt injection defense",
    "egress filtering",
    "Bubblewrap Landlock",
    "Seatbelt macOS",
    "AppContainer Windows",
    "zero-leak"
  ],
  authors: [
    { name: "Divyanshu Jethi", url: "https://ritualdev.in/about" },
    { name: "Sakshi Sharma", url: "https://ritualdev.in/about" }
  ],
  creator: "RitualDev",
  publisher: "RitualDev",
  verification: {
    google: "4F91SuqID1yRYtZu5m-RhX-nuwt91lW7g-utrYMc5jY",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "RitualDev — Autonomous AI Agent Defense Suite",
    description: "Enterprise runtime zero-leak defense, database guardrail proxy, and 96.7% context compaction for AI coding agents.",
    url: "https://ritualdev.in",
    siteName: "RitualDev",
    images: [
      {
        url: "/favicon.svg",
        width: 512,
        height: 512,
        alt: "RitualDev Shield Mark",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RitualDev — Autonomous AI Agent Defense",
    description: "Enterprise zero-leak sandbox and database guardrails for AI coding agents.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://ritualdev.in/#organization",
        "name": "RitualDev",
        "url": "https://ritualdev.in",
        "logo": "https://ritualdev.in/favicon.svg",
        "sameAs": [
          "https://github.com/RitualDev-Lab",
          "https://open-vsx.org/namespace/ritualdev-lab"
        ],
        "description": "Independent software engineering studio specializing in autonomous AI agent defense, kernel sandboxing, database wire proxies, and offline-first developer tools.",
        "founders": [
          {
            "@type": "Person",
            "name": "Divyanshu Jethi"
          },
          {
            "@type": "Person",
            "name": "Sakshi Sharma"
          }
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://ritualdev.in/#website",
        "url": "https://ritualdev.in",
        "name": "RitualDev",
        "publisher": {
          "@id": "https://ritualdev.in/#organization"
        }
      },
      {
        "@type": "SoftwareApplication",
        "name": "AgentShield",
        "operatingSystem": "Linux, macOS, Windows",
        "applicationCategory": "SecurityApplication",
        "description": "Zero-leak secret defense & kernel sandbox for autonomous AI coding agents.",
        "url": "https://ritualdev.in/agentshield/",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      },
      {
        "@type": "SoftwareApplication",
        "name": "DBShield",
        "operatingSystem": "Cross-platform",
        "applicationCategory": "DeveloperApplication",
        "description": "Database guardrail wire proxy, virtual schema masking, and ChatOps approval bot.",
        "url": "https://ritualdev.in/dbshield/",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      },
      {
        "@type": "SoftwareApplication",
        "name": "SkillPrism",
        "operatingSystem": "Cross-platform",
        "applicationCategory": "DeveloperApplication",
        "description": "Context compaction engine cutting LLM tool prompt bloat by 96.7% using JIT disclosure.",
        "url": "https://ritualdev.in/skillprism/",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      }
    ]
  };

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="alternate" type="text/plain" href="https://ritualdev.in/llms.txt" title="LLM Documentation" />
        <link rel="alternate" type="application/rss+xml" href="https://ritualdev.in/feed.xml" title="DevShelf RSS Feed" />
        <link rel="alternate" type="application/atom+xml" href="https://ritualdev.in/atom.xml" title="DevShelf Atom Feed" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-slate-100 antialiased selection:bg-brand-green/30 selection:text-brand-neon">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
