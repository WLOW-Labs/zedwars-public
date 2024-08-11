import { ProvidePlugin } from 'webpack'
export const webpack = {
  configure: (webpackConfig: any) => {
    // ...add your webpack config
    webpackConfig.resolve.fallback = {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer/'),
      zlib: require.resolve('browserify-zlib'),
      path: require.resolve('path-browserify'),
      ...webpackConfig.resolve.fallback,
    }
    webpackConfig.resolve.symlinks = false
    webpackConfig.plugins = [
      ...webpackConfig.plugins,
      new ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),
    ]

    console.log(webpackConfig)
    return webpackConfig
  },
}
