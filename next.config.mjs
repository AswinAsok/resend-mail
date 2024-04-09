/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY,
  },
};

export default nextConfig;
