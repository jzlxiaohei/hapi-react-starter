/**
 * init global variables first
 */
require("./common-var/global-var")()

const path = require('path')
const Hapi = require('hapi')

/** global $config **/
const internals = {
    servers: {
            port: $config.webPort,
            host: $config.webHost,
    }
}

const server = new Hapi.Server({
    cache:[
        {
            name:'redis',
            engine:require('catbox-redis'),
            host: $config.redisHost,
            port: $config.redisPort,
            partition:'hapi-cache'
        }
    ]
})
server.connection(internals.servers)

require("./common-var/server-var")(server)


/**
 * init server Plugins
 * @description server级 plugins初始化
 */
require('./server-plugins')(server)


/**
 *
 */
server.ext('onRequest',function(req,reply){
    global.req = req
    return reply.continue()
})
server.ext('onPreHandler',function(req,reply){
    console.log(222)
    return reply.continue()
})
server.ext('onPostHandler',function(req,reply){
    console.log(333)
    return reply.continue()
})


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