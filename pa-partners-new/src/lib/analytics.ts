export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "";

export const trackPageview = (url: string) => {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined") return;
  window.gtag?.("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

declare global {
  interface Window {
    gtag?: (
      command: "config" | "event",
      targetId: string,
      params?: Record<string, unknown>,
    ) => void;
  }
}


