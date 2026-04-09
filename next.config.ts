import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Оптимизация изображений
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },

  // Заголовки безопасности
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },

  // Редиректы (при необходимости)
  async redirects() {
    return [
      { source: "/features/chat",      destination: "/features", permanent: false },
      { source: "/features/documents", destination: "/features", permanent: false },
      { source: "/features/content",   destination: "/features", permanent: false },
      { source: "/features/code",      destination: "/features", permanent: false },
      { source: "/cookies",            destination: "/privacy",  permanent: false },
      { source: "/blog",               destination: "/learn",    permanent: false },
      { source: "/about",              destination: "/business", permanent: false },
      { source: "/docs",               destination: "/features", permanent: false },
    ];
  },
};

export default withNextIntl(nextConfig);
