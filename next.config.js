/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  serverExternalPackages: ['pdfjs-dist', 'mammoth'],
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
  turbopack: {
    resolveAlias: {
      canvas: './empty-module.js',
    },
  },
};

module.exports = nextConfig;
