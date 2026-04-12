import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/proxy-api/users/:path*',
        destination: 'http://74.226.194.15/api/users/:path*',
      },
      {
        source: '/proxy-api/products/:path*',
        destination: 'http://74.226.194.15/api/products/:path*',
      },
    ]
  },
};

export default nextConfig;
