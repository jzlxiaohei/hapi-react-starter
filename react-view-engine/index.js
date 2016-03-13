var path = require('path')
var React = require('react')
var ReactDOMServer = require("react-dom/server")

function ReactViewEngine(views, opt) {
    this.views = views
    opt = opt || {}
    this.isProduction = opt.isProduction === (undefined ? process.env.NODE_ENV === "production" : opt.isProduction)
    this.moduleDetectRegEx = new RegExp('^' + views);
}

ReactViewEngine.prototype.renderToStaticMarkup = function (filePath, options) {
    var moduleDetectRegEx = this.moduleDetectRegEx
    var isProduction = this.isProduction
    var filename = path.join(this.views, filePath)
    try {
        var reactComponent = require(filename)
        return ReactDOMServer.renderToStaticMarkup(
            React.createElement(reactComponent, options)
        )
    } catch (e) {
        return e
    } finally {
        if (!isProduction) {
            Object.keys(require.cache).forEach(function (module) {
                if (moduleDetectRegEx.test(require.cache[module].filename)) {
                    delete require.cache[module];
                }
            });
        }
    }
}

module.exports = ReactViewEngine
