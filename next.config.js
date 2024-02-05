/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mysql2"],
  },
};

module.exports = nextConfig;
