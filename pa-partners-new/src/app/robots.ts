import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = "https://papartners.co";
  return {
    rules: [{ userAgent: "*" }],
    sitemap: `${base}/sitemap.xml`,
  };
}



