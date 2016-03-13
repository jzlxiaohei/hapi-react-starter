//log: os.hostname(),time,pid
var moment = require("moment")
var _ = require('lodash')
var hostname = require('os').hostname,
    pid = process.pid
function Logger(server) {
    this.server = server
}

var proto = Logger.prototype
proto.info = function (msg, opt) {
    this.server.log(['info'],generateLogJson(msg, opt))
}

proto.warn = function (msg, opt) {
    this.server.log(['warn'],generateLogJson(msg, opt))
}

proto.error = function (msg, opt) {
    this.server.log(['error'],generateLogJson(msg, opt))
}

module.exports = Logger

function generateLogJson(msg, option) {
    var json = {
        t: moment().format('YYYYY-MM-DD hh:mm:ss'),
        m: msg,
        pid: pid,
        hn: hostname,
        file:__filename
    }
    _.extend(json, option)

    return JSON.stringify(json)
}

