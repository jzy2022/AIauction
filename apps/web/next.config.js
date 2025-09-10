/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@aiauction/ui"],
  env: {
    NEXT_PUBLIC_HLS_URL: process.env.NEXT_PUBLIC_HLS_URL,
  },
}

module.exports = nextConfig