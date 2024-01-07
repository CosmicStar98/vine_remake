/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  swcMinify: true,
      experimental: {
        images: {
            unoptimized: true
        }
    },
  images: {
    unoptimized: true,
      loader: 'imgix',
      path: '/',
    domains: ['pbs.twimg.com', 'lh3.googleusercontent.com']
  }
}

module.exports = nextConfig
