const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin');

const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const GitRevisionPlugin = require("git-revision-webpack-plugin");
const gitRevisionPlugin = new GitRevisionPlugin({ lightweightTags: true });

const mode = process.env.NODE_ENV || "development";
const prod = mode === "production";

process.traceDeprecation = true;

module.exports = {
    entry: {
        bundle: ["./src/main.js"],
    },
    resolve: {
        alias: {
            svelte: path.resolve("node_modules", "svelte"),
        },
        extensions: [".mjs", ".js", ".svelte"],
        mainFields: ["svelte", "browser", "module", "main"],
    },
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "[name].[hash].js",
        chunkFilename: "[name].[hash].js",
        publicPath: "/",
    },
    module: {
        rules: [
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [["@babel/preset-env", { targets: "defaults" }]],
                    },
                },
            },
            {
                test: /\.svelte$/,
                use: {
                    loader: "svelte-loader",
                    options: {
                        emitCss: true,
                        hotReload: true,
                        preprocess: require("svelte-preprocess")({
                            paths: ["src", "src/stylesheets"],
                        }),
                        onwarn(warning, onwarn) {
                            // Disable "Unused CSS Selector" warnings. We should clean out the CSS instead.
                            return warning.code === "css-unused-selector" || onwarn(warning);
                        },
                    },
                },
            },
            {
                test: /\.css$/,
                use: [prod ? MiniCssExtractPlugin.loader : "style-loader", "css-loader"],
            },
            {
                test: /\.svg$/,
                loader: "svg-inline-loader",
                options: {
                    removeSVGTagAttrs: false,
                },
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: ["file-loader"],
            },
        ],
    },
    mode,
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css",
        }),
        new webpack.DefinePlugin({
            VERSION: JSON.stringify(gitRevisionPlugin.version()),
            COMMITHASH: JSON.stringify(gitRevisionPlugin.commithash()),
            BRANCH: JSON.stringify(gitRevisionPlugin.branch()),
        }),
        // load only `moment/locale/en.js` and `moment/locale/nl.js`
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en|nl/),
        new HtmlWebpackPlugin({
            template: "src/index.html.ejs",
            favicon: "src/favicon.ico",
            hash: true,
        }),
        false ? new HtmlWebpackPartialsPlugin({
            path: 'src/piwik.html',
            location: 'head',
            priority: 'low'
        }) : false,
        // prod ? new BundleAnalyzerPlugin({
        //     analyzerMode: "disabled",
        //     generateStatsFile: false,
        //     openAnalyzer: false
        // }) : false
    ].filter(Boolean),
    devtool: prod ? false : "source-map",
    devServer: {
        static: {
            directory: path.join(__dirname, "./public"),
        },
        historyApiFallback: true,
        hot: false,
        compress: true,
        client: {
            overlay: false,
        },
    },
    performance: { hints: false },
    optimization: {
        minimize: prod,
        minimizer: [new UglifyJsPlugin()],
    },
};
