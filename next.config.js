/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  exportPathMap: function () {
    return {
      '/': {page: '/'}
    }
  },
  webpack: {
    module: {
      rules: [
        {
          test: /\.css?$/,
          use: ['isomorphic-style-loader', {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              esModule:false,
              modules: {
                // 自定义生成的类名
                localIdentName: '[name]_[local]_[hash:base64:5]',
              }
            }
          }]
        }
      ],
    },
  }
}

module.exports = nextConfig
