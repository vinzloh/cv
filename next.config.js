/** @type {import('next').NextConfig} */

module.exports = {
  experimental: { reactRoot: true },
  webpack: (config, { dev }) => {
    if (dev) {
      config.module.rules.push({
        test: /\.(js|jsx|ts|tsx)$/,
        loader: 'eslint-loader',
        exclude: ['/node_modules/'],
        enforce: 'pre',
        options: {
          emitWarning: true,
          fix: true,
        },
      })
    }
    return config
  },
}
