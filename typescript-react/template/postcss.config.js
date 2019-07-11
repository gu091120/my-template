const config = require("./config");

module.exports = {
    ident: "postcss",
    sourceMap: config.isDev,
    plugins: [
        require("autoprefixer")({
            browsers: ["iOS >= 8", "Android >= 4"]
        })
    ]
};
