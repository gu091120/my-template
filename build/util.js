
const path = require("path")
const config = require("../../easy_create_app/typescript-project/config/index")
const portfinder = require("portfinder")


exports.assetsPath = function(_path){
    if(config.isDev){
        _path = _path.replace("chunkHash","hash")
    }

  return path.join(config.assetsSubDirectory, _path)
}

exports.getPort = function(port){
  portfinder.basePort = 8080
  return portfinder.getPortPromise()
}
