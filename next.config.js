/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  }
}

module.exports = nextConfig


/**
 *  images: {
    remotePatterns: [{hostname: "images.unsplash.com"}],
  }
 */