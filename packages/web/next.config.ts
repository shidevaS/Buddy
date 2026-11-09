/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
  // Allow the shared workspace package to resolve its own TS.
  transpilePackages: ['@tuiton/shared'],
};

export default nextConfig;
