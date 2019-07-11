const config = require("./config");

module.exports = {
    ident: "postcss",
    sourceMap: config.isDev,
    plugins: [
        require("autoprefixer")({
            browsers: [
              {{#if terminal  "H5"}}
              "iOS >= 8",
              "Android >= 4",
              {{else}}
              "last 2 versions",
              "> 1%",
              "ie >= 9"
              {{/if}}
            ]
        })
    ]
};
