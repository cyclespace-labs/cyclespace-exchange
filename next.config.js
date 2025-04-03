/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false }
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    return config
  },
  reactStrictMode: true,
}

module.exports = {
  experimental: {
    turbo: {
      // Example: adding an alias and custom file extension
      resolveAlias: {
        underscore: 'lodash',
      },
      resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.json'],
    },
  },
}
