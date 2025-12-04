import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    allowedDevOrigins: ["http://localhost:3001", "https://*.ngrok-free.app"],
  } as any,
};

export default nextConfig;
