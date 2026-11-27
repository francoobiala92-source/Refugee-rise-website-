import type { NextConfig } from "next";

// Pages are still pre-rendered as static HTML; only /api/chat/ runs on the server
// (it needs a server to keep the AI API key secret).
const nextConfig: NextConfig = {
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
