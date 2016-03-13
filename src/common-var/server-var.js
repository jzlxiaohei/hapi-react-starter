const Logger = require('../utils/logger')

module.exports = function initServerVar(server) {

    global.$log = new Logger(server)
}