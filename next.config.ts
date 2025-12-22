import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    allowedDevOrigins: ["http://localhost:3000", "https://*.ngrok-free.app",'https://solar-ai-ashen.vercel.app/'],
  } as any,
};

export default nextConfig;
