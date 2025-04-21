/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false }
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    return config
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: "",
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: "",
      },
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        port: "",
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: "",
      },
      {
        protocol: 'https',
        hostname: 'assets.aceternity.com',
        port: "",
      }
    ]
  }
}

module.exports = {
    ...nextConfig,
    turbopack: { 
      // Example: adding an alias and custom file extension
      resolveAlias: {
        underscore: 'lodash',
      },
      resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.json'],
    },
}
