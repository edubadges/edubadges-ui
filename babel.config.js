module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                debug: false,
                "corejs": 3,
                "useBuiltIns": "entry",
                targets: ['last 2 versions', 'ie >= 11']
            }],
    ]
};