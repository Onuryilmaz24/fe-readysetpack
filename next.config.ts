// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true, // 301 redirect (permanent)
      },
    ];
  },
};

export default nextConfig;
