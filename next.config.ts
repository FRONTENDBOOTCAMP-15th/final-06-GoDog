import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/mypage",
        destination: "/mypage/profile",
      },
    ];
  },
};

export default nextConfig;
