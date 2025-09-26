import type { Metadata } from "next";

export const defaultMetadata: Metadata = {
  metadataBase: new URL("https://papartners.co"),
  title: {
    default: "PA Partners",
    template: "%s | PA Partners",
  },
  description:
    "Navigating Tomorrow's Markets with Today's Investments. PA Partners focuses on value-add, cash-flowing real estate and practical AI solutions.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    siteName: "PA Partners",
  },
  twitter: {
    card: "summary_large_image",
  },
};


