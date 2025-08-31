/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {},
    // Ensure server bundling of CJS libs like rss-parser
    serverComponentsExternalPackages: ['rss-parser'],
  },
};

export default nextConfig;
