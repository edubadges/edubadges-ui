const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require("webpack")

const GitRevisionPlugin = require('git-revision-webpack-plugin');
const gitRevisionPlugin = new GitRevisionPlugin({lightweightTags: true});

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
        path: __dirname + "/public",
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
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {targets: "defaults"}]
                        ]
                    }
                }
            }, {
                test: /\.svelte$/,
                use: {
                    loader: "svelte-loader",
                    options: {
                        emitCss: true,
                        hotReload: true,
                        preprocess: require("svelte-preprocess")({
                            paths: ["src", "src/stylesheets"],
                        }),
                        onwarn(warning, onwarn) { // Disable "Unused CSS Selector" warnings. We should clean out the CSS instead.
                          return warning.code === 'css-unused-selector' || onwarn(warning);
                        },
                    },
                },
            },
            {
                test: /\.css$/,
                use: [
                    prod || true ? MiniCssExtractPlugin.loader : "style-loader",
                    "css-loader",
                ],
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
                use: [
                    'file-loader',
                ],
            },
        ],
    },
    mode,
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css",
        }),
        new webpack.DefinePlugin({
            'VERSION': JSON.stringify(gitRevisionPlugin.version()),
            'COMMITHASH': JSON.stringify(gitRevisionPlugin.commithash()),
            'BRANCH': JSON.stringify(gitRevisionPlugin.branch()),
        }),
        // load only `moment/locale/en.js` and `moment/locale/nl.js`
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en|nl/),
        new HtmlWebpackPlugin({
            template: "src/index.html.ejs",
            favicon: "src/favicon.ico",
            hash: true,
        }),
        // prod ? new BundleAnalyzerPlugin({
        //     analyzerMode: "disabled",
        //     generateStatsFile: false,
        //     openAnalyzer: false
        // }) : false
    ].filter(Boolean),
    // devtool: prod ? false : "source-map",
    devtool: false, //prod ? false : "source-map",
    devServer: {
        port: 4000,
        historyApiFallback: true,
    },
    performance: {hints: false}
};
