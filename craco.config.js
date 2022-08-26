const path = require('path')
const resolve = dir => path.resolve(__dirname, dir)
const TerserPlugin = require('terser-webpack-plugin')


module.exports = {
  webpack: {
    alias: {
      "@": resolve("src"),
      "components": resolve("src/components"),
      "pages": resolve("src/pages"),
      "api": resolve("src/api"),
      "utils": resolve("src/utils")
    },
    plugins: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: process.env.NODE_ENV === 'production'
            // 生产环境下移除控制台所有的内容
          }
        }
      })
    ],
    configure: (webpackConfig, { env, paths }) => {
      paths.appBuild = 'dist/react-admin';
      webpackConfig.output = {
        ...webpackConfig.output,
        path: path.resolve(__dirname, 'dist/react-admin'),
        publicPath: process.env.NODE_ENV === 'production' ? './' : '/'
      }
      return webpackConfig;
    }
  }
}