const webpack = require("webpack");
const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const cacheGroups = {
  vendor: {
    chunks: "initial",
    test: /node_modules/,
    name: "vendor",
    enforce: true
  }
};

const main = {
  output: {
    pathinfo: false,
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
    publicPath: "/",
  },

  stats: { children: false, timings: true, colors: true },

  devtool: "eval-source-map",

  entry: {
    app: "./src/index.tsx",
  },
  devServer: {
    disableHostCheck: true,
    historyApiFallback: {
      rewrites: [{ from: /.*\.html/, to: "/" }]
    },
    stats: { children: false },
    https: false,
    host: "localhost",
    port: "8080",
    contentBase: path.join(__dirname, 'dist'),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".png"],
    modules: [path.resolve("./src"), path.resolve("./node_modules")],
    plugins: [new TsconfigPathsPlugin()]
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        include: [path.resolve("./src")],
        exclude: [/node_modules/, /test\.tsx?$/, path.resolve("./modules")],
        use: [
          {
            loader: "awesome-typescript-loader",
            options: { useCache: true, forceIsolatedModules: true }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        include: [path.resolve(__dirname,"./src/assets")],
        use: [
          {
            loader: 'url-loader',
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html",
      chunks: ["app", ...Object.values(cacheGroups).map(x => x.name)],
      chunksSortMode: "none"
    }),
    // new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new webpack.WatchIgnorePlugin([/css\.d\.ts$/, /test\.ts(x?)/])
  ],

  //TODO: Make sure have separate dependencies for module
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: {
      chunks: "async",
      cacheGroups: {
        vendor: { test: /node_modules/ }
      }
    }
  },
  externals: {
    react: 'React'
  }
};

module.exports = main;

