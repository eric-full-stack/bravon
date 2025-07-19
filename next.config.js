/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/pdfs/:path*",
        destination: "/api/pdfs/:path*",
      },
    ];
  },
  reactStrictMode: true,
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
  experimental: {   
    serverComponentsExternalPackages: ["mysql2"],
  },
};

module.exports = nextConfig;
