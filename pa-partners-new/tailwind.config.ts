import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}", "./src/app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0F172A", // Midnight
          foreground: "#F8FAFC",
        },
        secondary: "#334155", // Slate
        accent: "#D4AF37", // Gold
        muted: "#94A3B8",
      },
      fontFamily: {
        sans: [
          "var(--font-geist-sans)",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Inter",
          "Helvetica Neue",
          "Arial",
          "system-ui",
          "sans-serif",
        ],
      },
      borderRadius: {
        lg: "0.75rem",
        xl: "1rem",
      },
      boxShadow: {
        card: "0 6px 20px rgba(2, 6, 23, 0.08)",
        elevated: "0 1px 0 rgba(255,255,255,0.10) inset, 0 1px 2px rgba(2,6,23,0.06)",
      },
      backgroundImage: {
        "radial-primary":
          "radial-gradient(800px 400px at 50% -10%, rgba(2,6,23,0.06), transparent 60%)",
        "radial-primary-dark":
          "radial-gradient(800px 400px at 50% -10%, rgba(148,163,184,0.12), transparent 60%)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
} satisfies Config;


