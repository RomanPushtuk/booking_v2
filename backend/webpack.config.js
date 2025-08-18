const path = require("path");
const { IgnorePlugin } = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const { PinoWebpackPlugin } = require("pino-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const WebpackShellPluginNext = require("webpack-shell-plugin-next");
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  target: "node",
  mode: "production",
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
    mainFields: ["main"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "source-map",
  plugins: [
    new IgnorePlugin({
      resourceRegExp: /(@koa|@babel|bufferutil|utf-8-validate)/,
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/gateway/swagger/BookingYml.openapi.yaml", to: "." },
        { from: "src/shared/logger/monitoring.js", to: "." },
        "../node_modules/.pnpm/node_modules/swagger-ui-dist/swagger-ui.css",
        "../node_modules/.pnpm/node_modules/swagger-ui-dist/swagger-ui-bundle.js",
        "../node_modules/.pnpm/node_modules/swagger-ui-dist/swagger-ui-standalone-preset.js",
        "../node_modules/.pnpm/node_modules/swagger-ui-dist/favicon-16x16.png",
        "../node_modules/.pnpm/node_modules/swagger-ui-dist/favicon-32x32.png",
        {
          from: "./**",
          to: "client",
          context: path.resolve(__dirname, "../", "client", "dist"),
        },
      ],
    }),
    new PinoWebpackPlugin({
      transports: ["pino-pretty"],
    }),
    new WebpackShellPluginNext({
      onBuildEnd: {
        scripts: ['echo "Webpack End"'],
      },
    }),
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'server',
    // }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_classnames: true,
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
};
