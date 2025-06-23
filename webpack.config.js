const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const { PinoWebpackPlugin } = require('pino-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  target: 'node',
	mode: 'production',
	entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
		mainFields: ['main'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
	plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /(@koa|@babel)/,
    }),
		new CopyPlugin({
      patterns: [
        { from: 'src/gateway/swagger/BookingYml.openapi.yaml', to: '.' },
      ],
    }),
    new PinoWebpackPlugin({ 
      transports: ['pino-pretty'],
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
};
