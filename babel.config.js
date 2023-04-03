module.exports = function (api) {
    api.cache(true);
    const presets = [
        [
            '@babel/preset-env',
            {
                debug: false,
                "corejs": 3,
                "useBuiltIns": "entry",
                targets: ['last 2 versions', 'ie >= 11']
            }],
    ];
    const plugins = ["@babel/plugin-proposal-optional-chaining"];
    return {presets, plugins};
};
