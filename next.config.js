const config = require("./src/config/config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // basePath: config.base_path !== "/" ? config.base_path : "",
  // trailingSlash: config.site.trailing_slash,
  unoptimized: true,
  swcMinify: true,
  // output: 'export',
  images: {
    domains: ['typeflipz.com'], // Add this line to allow images from localhost
  },
};

module.exports = nextConfig;