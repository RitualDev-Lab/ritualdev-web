import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export const metadata: Metadata = {
  title: "RitualDev — Autonomous AI Agent Defense, Sandboxing & Zero-Leak Studio",
  description: "Enterprise runtime secret defense, kernel sandboxing (Bubblewrap, Landlock, Seatbelt, AppContainer), database wire proxy, 96.7% token compaction, and 567+ verified developer tools.",
  metadataBase: new URL("https://ritualdev.in"),
  keywords: [
    "AI agent security",
    "AI agent defense",
    "kernel sandbox",
    "AgentShield",
    "DBShield",
    "SkillPrism",
    "DevShelf",
    "WebSecAuditor",
    "MCPBuilderKit",
    "Model Context Protocol",
    "MCP servers directory",
    "Claude Code security hooks",
    "Cursor AI sandbox",
    "Windsurf extension",
    "database guardrail proxy",
    "token compaction",
    "prompt injection defense",
    "egress filtering",
    "Bubblewrap Landlock",
    "Seatbelt macOS",
    "AppContainer Windows",
    "zero-leak secret redactor",
    "agentshield-defense PyPI",
    "free developer tools",
    "open source alternatives to Postman Datadog Sentry"
  ],
  authors: [
    { name: "Divyanshu Jethi", url: "https://ritualdev.in/about/" },
    { name: "Sakshi Sharma", url: "https://ritualdev.in/about/" }
  ],
  creator: "RitualDev",
  publisher: "RitualDev",
  verification: {
    google: "4F91SuqID1yRYtZu5m-RhX-nuwt91lW7g-utrYMc5jY",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      { url: "/favicon-192x192.png", type: "image/png", sizes: "192x192" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "RitualDev — Autonomous AI Agent Defense Suite",
    description: "Enterprise runtime zero-leak defense, database guardrail proxy, and 96.7% context compaction for AI coding agents.",
    url: "https://ritualdev.in",
    siteName: "RitualDev",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "RitualDev Lab Official Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RitualDev — Autonomous AI Agent Defense",
    description: "Enterprise zero-leak sandbox and database guardrails for AI coding agents.",
    images: ["/og-image.png"],
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
        "logo": {
          "@type": "ImageObject",
          "url": "https://ritualdev.in/logo.png",
          "width": 384,
          "height": 384
        },
        "sameAs": [
          "https://github.com/RitualDev-Lab",
          "https://open-vsx.org/namespace/ritualdev-lab",
          "https://marketplace.visualstudio.com/items?itemName=ritualdev.agentshield-defense",
          "https://pypi.org/project/agentshield-defense/"
        ],
        "description": "Independent software engineering studio specializing in autonomous AI agent defense, kernel sandboxing, database wire proxies, and offline-first developer tools.",
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "email": "support@ritualdev.in",
            "contactType": "customer support"
          },
          {
            "@type": "ContactPoint",
            "email": "developer@ritualdev.in",
            "contactType": "technical support"
          },
          {
            "@type": "ContactPoint",
            "email": "security@ritualdev.in",
            "contactType": "security"
          },
          {
            "@type": "ContactPoint",
            "email": "hello@ritualdev.in",
            "contactType": "sales"
          }
        ],
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
        "description": "Zero-leak secret defense & OS kernel sandboxing for autonomous AI coding agents (Claude Code, Cursor, Windsurf).",
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
        "description": "Context compaction engine cutting LLM tool prompt bloat by 96.7% using JIT progressive disclosure.",
        "url": "https://ritualdev.in/skillprism/",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      },
      {
        "@type": "SoftwareApplication",
        "name": "DevShelf",
        "operatingSystem": "Web, CLI (npx devshelf-mcp)",
        "applicationCategory": "DeveloperApplication",
        "description": "Curated catalog of 567+ verified developer tools, free APIs, and Model Context Protocol (MCP) servers with zero paywalls.",
        "url": "https://ritualdev.in/devshelf/",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://ritualdev.in/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is AgentShield and how does it secure AI coding agents?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "AgentShield is a runtime defense and OS-level kernel sandbox (Bubblewrap on Linux, Landlock, Seatbelt on macOS, AppContainer on Windows) designed for autonomous AI agents like Claude Code, Cursor, and Windsurf. It intercepts process execution, redacts environment credentials (.env, AWS keys, GitHub tokens) before they reach the model, and replaces sensitive tokens with synthetic decoy honeytokens."
            }
          },
          {
            "@type": "Question",
            "name": "How does DevShelf help developers find tools and MCP servers?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "DevShelf is an open-access catalog indexing 567+ verified developer tools, free APIs, and Model Context Protocol (MCP) servers with no login or paywalls. It offers 1-click Docker Compose configs, package install snippets, a terminal CLI, and an official MCP server for AI coding assistants."
            }
          },
          {
            "@type": "Question",
            "name": "How does DBShield protect production databases from AI agent queries?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "DBShield acts as an air-gapped PostgreSQL wire proxy (protocol 3.0) and SQLite guardrail that intercepts destructive operations (DROP, TRUNCATE, UPDATE without WHERE), quarantines unindexed table scans, and triggers interactive two-man rule Slack/Teams approvals."
            }
          }
        ]
      }
    ]
  };

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="alternate" type="text/plain" href="https://ritualdev.in/llms.txt" title="LLM Documentation" />
        <link rel="ard" type="application/json" href="https://ritualdev.in/.well-known/ard.json" title="Agentic Resource Discovery" />
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
        <BackToTop />
      </body>
    </html>
  );
}
