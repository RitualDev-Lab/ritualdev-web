import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#070A10",
        surface: {
          50: "#161F33",
          100: "#111827",
          200: "#0D1322",
          300: "#090D17",
          400: "#060910"
        },
        brand: {
          green: "#3DDC84",
          neon: "#00F59B",
          cyan: "#38BDF8",
          purple: "#A855F7",
          amber: "#F59E0B"
        }
      },
      fontFamily: {
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"]
      }
    },
  },
  plugins: [],
};

export default config;
