/**
 * init global variables first
 */
require("./common-var/global-var")()

const path = require('path')
const Hapi = require('hapi')

/** global $config **/
const internals = {
    servers: {
        web: {
            port: $config.webPort,
            host: $config.webHost,
            labels: ['web']
        },
        api: {
            port: $config.apiPort,
            host: $config.apiHost,
            labels: ['api']
        }
    },
    options: {
        files: {
            relativeTo: __dirname
        }
    }
}

const server = new Hapi.Server()
server.connection(internals.servers.web)
server.connection(internals.servers.api)

require("./common-var/server-var")(server)


/**
 * init server Plugins
 * @description server级 plugins初始化
 */
require('./server-plugins')(server)

/**
 * init router plugins
 * @description 路由（页面和api）初始化
 */
const plugins = require('./plugins')
server.register(plugins,function(err){
    if (err) {console.error('Failed to load routers plugin:', err);}
})

module.exports = server

//use to proxy api(java)
//var httpProxy = require('http-proxy');
//
//var apiProxy = httpProxy.createProxyServer();
//
//app.get("/api/*", function(req, res){
//    apiProxy.web(req, res, { target: 'http://google.com:80' });
//});