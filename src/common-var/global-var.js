const path = require("path")
const config = require('../../config')
const Logger = require('../utils/logger')
const ReactEngine = require("../../react-view-engine")


module.exports = function initGlobalVar() {
    global.$config = config

    global.$reactViewEngine = new ReactEngine(
        path.join(__dirname, "../components"),
        {isProduction: config.isProduction}
    )

}

