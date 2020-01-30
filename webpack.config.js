const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const mode = process.env.NODE_ENV || "development";
const prod = mode === "production";

process.traceDeprecation = true;

module.exports = {
  entry: {
    bundle: ["./src/main.js"]
  },
  resolve: {
    alias: {
      svelte: path.resolve("node_modules", "svelte")
    },
    extensions: [".mjs", ".js", ".svelte"],
    mainFields: ["svelte", "browser", "module", "main"]
  },
  output: {
    path: __dirname + "/public",
    filename: "[name].[hash].js",
    chunkFilename: "[name].[hash].js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        use: {
          loader: "svelte-loader",
          options: {
            emitCss: true,
            hotReload: true
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          /**
           * MiniCssExtractPlugin doesn't support HMR.
           * For developing, use 'style-loader' instead.
           * */
          prod ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader"
        ]
      },
      {
        test: /\.svg$/,
        loader: "svg-inline-loader",
        options: {
          removeSVGTagAttrs: false
        }
      }
    ]
  },
  mode,
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css"
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html.ejs",
      favicon: "src/favicon.ico",
      hash: true
    })
  ],
  devtool: prod ? false : "source-map",
  devServer: {
    port: 4000,
    proxy: {
      "/myconext/api": "http://localhost:8000",
      "/config": "http://localhost:8000"
    },
    historyApiFallback: true
  }
};
