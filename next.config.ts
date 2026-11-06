import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'cosmicpower.ltd',
          },
        ],
        destination: 'https://www.cosmicpower.ltd/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
