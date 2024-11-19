const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack")
const { merge } = require('webpack-merge')
const sveltePreprocess = require('svelte-preprocess');
const WebpackBar = require('webpackbar')

const GitRevisionPlugin = require('git-revision-webpack-plugin');
const gitRevisionPlugin = new GitRevisionPlugin({ lightweightTags: true });

process.traceDeprecation = true;

var svelte = mode => {
    const prod = mode === 'production'

    return {
        resolve: {
            alias: {
                svelte: path.resolve("node_modules", "svelte"),
            },
            extensions: ['.mjs', '.js', '.svelte'],
            mainFields: ['svelte', 'browser', 'module', 'main']
        },
        optimization: {
            minimize: prod,
            minimizer: ['...', new CssMinimizerPlugin()],
            usedExports: true,
            splitChunks: {
                chunks: 'all',
                name: (module, chunks, cacheGroupKey) => {
                    const allChunksNames = chunks.map((chunk) => chunk.name).join('_');
                    const prefix = cacheGroupKey === 'defaultVendors' ? 'vendors' : cacheGroupKey;
                    return `${prefix}_${allChunksNames}`;
                },
            },
            runtimeChunk: { name: 'runtime' }
        },
        module: {
            rules: [
                {
                    test: /\.svelte$/,
                    use: {
                        loader: 'svelte-loader',
                        options: {
                            hotReload: !prod,
                            preprocess: sveltePreprocess({}),
                            onwarn(warning, onwarn) { // Disable "Unused CSS Selector" warnings. We should clean out the CSS instead.
                                return warning.code === 'css-unused-selector' || onwarn(warning);
                            },
                        },

                    }
                },
                {
                    test: /node_modules\/svelte\/.*\.mjs$/,
                    resolve: {
                        fullySpecified: false
                    }
                }
            ]
        }
    }
}


var config = {
    entry: {
        bundle: ["./src/main.js"],
    },
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "[name].[fullhash].js",
        chunkFilename: "[name].[fullhash].js",
        publicPath: "/",
        hashFunction: 'xxhash64'
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
                            ['@babel/preset-env', { targets: "defaults" }]
                        ],
                        plugins: ["@babel/plugin-transform-runtime"]
                    }
                },
                resolve: {
                    fullySpecified: false,
                }
            },
            {
                test: /\.m?js$/,
                type: 'javascript/auto',
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false, // necessary if you use url('/path/to/some/asset.png|jpg|gif')
                        }
                    }
                ]
            },
            {
                test: /\.svg$/,
                loader: "svg-inline-loader",
                options: {
                    removeSVGTagAttrs: false,
                },
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                type: 'asset/inline',
            },
        ],
    },
    plugins: [
        new WebpackBar(),
        new MiniCssExtractPlugin({
            filename: "[name].[fullhash].css",
            chunkFilename: "[name].[contenthash].css"
        }),
        new webpack.DefinePlugin({
            'VERSION': JSON.stringify(gitRevisionPlugin.version()),
            'COMMITHASH': JSON.stringify(gitRevisionPlugin.commithash()),
            'BRANCH': JSON.stringify(gitRevisionPlugin.branch()),
        }),
        // load only `moment/locale/en.js` and `moment/locale/nl.js`
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en|nl/),
        // prod ? new BundleAnalyzerPlugin({
        //     analyzerMode: "disabled",
        //     generateStatsFile: false,
        //     openAnalyzer: false
        // }) : false
    ].filter(Boolean),
    devServer: {
        hot: true,
        compress: true,
        historyApiFallback: true,
    },
    cache: true,
};


module.exports = (_env, argv) => {
    console.log("Mode: " + argv.mode)

    if (argv.mode === undefined || argv.mode === 'development') {
        config.mode = "development"
        config.devtool = 'source-map';

        config.plugins.push(new HtmlWebpackPlugin({
            template: "src/index.html.ejs",
            favicon: "src/favicon.ico",
            hash: true,
        }))
    }

    if (argv.mode === 'production') {
        config.mode = "production"
        config.devtool = false
        config.plugins.push(new HtmlWebpackPlugin({
            template: "src/index.html.prod.ejs",
            favicon: "src/favicon.ico",
            hash: true,
        }))
    }

    return merge([config, svelte(config.mode)]);
};
