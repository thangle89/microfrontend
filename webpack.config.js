const webpack = require("webpack");
const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const cacheGroups = {
  vendor: {
    chunks: "initial",
    test: /node_modules/,
    name: "vendor",
    enforce: true
  }
};

module.exports = {
  output: {
    pathinfo: false,
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
    publicPath: "/",
  },

  stats: { children: false, timings: true, colors: true },

  devtool: "eval-source-map",

  entry: {
    app: [
      "./src/index.tsx"
    ]
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
        exclude: [/node_modules/, /test\.tsx?$/],
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
    new webpack.WatchIgnorePlugin([/css\.d\.ts$/, /test\.ts(x?)/])
  ],

  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: {
      chunks: "async",
      cacheGroups: {
        vendor: { test: /node_modules/ }
      }
    }
  }
};
