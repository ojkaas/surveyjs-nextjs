/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  /*
  webpack: (config, { isServer }) => {
    // Add the aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      'handlebars/runtime': 'handlebars/dist/cjs/handlebars.runtime',
      handlebars: 'handlebars/dist/cjs/handlebars.runtime',
    }
    return config
  },
  */
}

export default nextConfig
