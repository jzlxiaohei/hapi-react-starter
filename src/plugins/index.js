const path = require('path')
const glob = require('glob')


const plugins = glob.sync(path.join(__dirname, './**/*.js'))
    .filter(function (file) {
        return path.relative(__dirname, file) !== 'index.js'
    })
    .map(function (file) {
        return require(file)
    })

module.exports = plugins