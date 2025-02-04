import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/api/:path*' // Your Express server port
      },
      {
        source: '/auth/:path*',
        destination: 'http://localhost:3001/auth/:path*'
      }
    ]
  }
};

export default nextConfig;