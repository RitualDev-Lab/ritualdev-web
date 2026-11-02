import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "RitualDev — Autonomous AI Agent Defense, Sandboxing & Zero-Leak Studio",
  description: "Enterprise-grade runtime secret defense, kernel sandboxing (Bubblewrap, Seatbelt, AppContainer), database wire proxy, 96.7% token compaction, and offline-first software.",
  metadataBase: new URL("https://ritualdev.in"),
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
    description: "Enterprise-grade runtime zero-leak defense, database guardrail proxy, context compaction, and offline developer tooling.",
    url: "https://ritualdev.in",
    siteName: "RitualDev",
    images: [
      {
        url: "/favicon.svg",
        width: 512,
        height: 512,
        alt: "RitualDev Mark",
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
    "@type": "Organization",
    "name": "RitualDev",
    "url": "https://ritualdev.in",
    "logo": "https://ritualdev.in/favicon.svg",
    "description": "Independent software engineering studio specializing in autonomous AI agent defense, kernel sandboxing, database guardrails, and offline-first mobile applications.",
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
  };

  return (
    <html lang="en" className="dark">
      <head>
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
