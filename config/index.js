var _ = require('lodash')

var defaultConfig = require('./config.default.js')
var localConfig = require('./config.local.js')

var finalConfig = _.merge({},defaultConfig,localConfig)

module.exports = finalConfig