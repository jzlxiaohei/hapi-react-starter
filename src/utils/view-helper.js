const fs = require('fs')

class ViewHelper {
    constructor(options) {
        this.assetsMapPath = options.assetsMapPath
        this.isProduction = options.isProduction === undefined ? process.env.NODE_ENV === "production" : options.isProduction
        this.prefix = options.prefix || ''
        this.devPath = options.devPath || ''
        this._init()
    }

    _init() {
        if (this.isProduction) {
            var fileContent = fs.readFileSync(this.assetsMapPath)
            this.assetsMap = JSON.parse(fileContent)
        }

    }

    _getProdPathByBasePath(path, prefix) {
        const aMap = this.assetsMap

        //aaa/bbb/ccc.js => name = aaa/bbb/ccc, suffix = js
        const lastIndex = path.lastIndexOf('.')
        const name = path.substr(0, lastIndex),
            suffix = path.substr(lastIndex + 1)
        if (name in aMap) {
            return prefix + aMap[name][suffix]
        } else {
            return path
        }
    }

    getStatic(path, prefix) {
        prefix = prefix || this.prefix
        if (this.isProduction) {
            return this._getProdPathByBasePath(path, prefix)
        } else {
            if (path.indexOf('/') == 0) {
                return path
            } else {
                return this.devPath + prefix + path
            }
        }
    }
}

module.exports = ViewHelper
