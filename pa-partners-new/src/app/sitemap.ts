import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://papartners.co";
  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/real-estate`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/ai`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/portfolio`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/team`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/contact`, changeFrequency: "monthly", priority: 0.7 },
  ];
}


