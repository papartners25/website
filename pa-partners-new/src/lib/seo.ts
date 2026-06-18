import type { Metadata } from "next";

export const defaultMetadata: Metadata = {
  metadataBase: new URL("https://papartners.co"),
  title: {
    default: "PA Partners",
    template: "%s | PA Partners",
  },
  description:
    "PA Partners provides development consulting, capital stack architecture, underwriting support, and internal multifamily and mixed-use development.",
  icons: {
    icon: "/logo/pa-favicon.ico",
    shortcut: "/logo/pa-favicon.ico",
    apple: "/logo/pa-favicon.ico",
  },
  openGraph: {
    type: "website",
    siteName: "PA Partners",
  },
  twitter: {
    card: "summary_large_image",
  },
};

