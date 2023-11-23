/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "interactive-examples.mdn.mozilla.net",
      "filedn.com",
      "hips.hearstapps.com",
    ],
  },
};

module.exports = nextConfig;
