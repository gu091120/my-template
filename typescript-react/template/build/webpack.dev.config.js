const merge = require("webpack-merge")
const webpackBaseConfig = require("./webpack.base.config")
const config = require("../config")
const util = require("./util")

let devserverPort = process.env.PORT || config.devserverPort

const webpackConfig = merge(webpackBaseConfig, {
    mode: "development",
    devServer: {
      hot: true,
      inline: true,
      useLocalIp: true,
      historyApiFallback: true,
      disableHostCheck: true,
      host: "0.0.0.0",
      proxy:config.devserverProxy
    }
})

module.exports = new Promise((resolve, reject) => {
    util.getPort(devserverPort).then(port => {
        devserverPort = port
        resolve(webpackConfig)
    })
})
