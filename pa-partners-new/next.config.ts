import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: process.cwd(),
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "papartners.co", pathname: "/wp-content/**" },
      { protocol: "https", hostname: "papartners.co", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "frunkvault.com" }],
        destination: "https://shop.frunkvault.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.frunkvault.com" }],
        destination: "https://shop.frunkvault.com/:path*",
        permanent: true,
      },
      {
        source: "/services",
        destination: "/development-consulting",
        permanent: false,
      },
      {
        source: "/ai",
        destination: "/new-business",
        permanent: false,
      },
      {
        source: "/opportunities",
        destination: "/new-business",
        permanent: false,
      },
    ];
  },
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(nextConfig);
