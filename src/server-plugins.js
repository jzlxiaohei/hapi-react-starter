/**
 * Created by zilong on 3/13/16.
 *
 * server 级的 plugins
 */
const path = require('path')
const Inert = require('inert')
const Vision = require('vision')
const HapiSwagger = require('hapi-swagger');

const ViewHelper = require('./utils/view-helper')
const assetsPath = path.join(__dirname, './webpack-assets.json')

const errProcess = (err)=>{if(err)throw err}

module.exports = function (server) {

    /**
     * static file server , 主要用于后端开发时的静态服务
     */
    server.register(Inert, function () {
    })
    server.route({
        method: 'GET', path: '/public/lib/{param*}',
        handler: {
            directory: {
                path: './public/lib'
            }
        }
    })
    server.route({
        method: 'GET', path: '/public/dist/{param*}',
        handler: {
            directory: {
                path: './public/dist',
                redirectToSlash: true
            }
        }
    })

    /**
     * view engine
     */

    server.register(Vision, function (err) {
        if (err) {
            throw err
        }

        server.views({
            engines: {
                jade: require('jade')
            },
            relativeTo: __dirname,
            path: './views',
            isCached: $config.isProduction,
            context: {
                $vh: new ViewHelper({
                    assetsMapPath: assetsPath,
                    isProduction: $config.isProduction,
                    prefix: '',
                    devPath: ''
                })
            }
        })
    })

    /**
     * async handler
     */
    server.register([require('hapi-async-handler')], errProcess);


    initLog(server)

    if($config.swaggerEnabled){
        initSwagger(server)
    }
}

function initLog(server) {
    var options = {
        opsInterval: 10 * 1000, //10s
        reporters: [{
            reporter: require('good-console'),
            events: {log: '*', response: '*',error:'*'}
        } /* , {
            reporter: require('good-file'),
            events: {ops: '*'},
            config: `./logs/metric_log_${$config.nodeAppInstance}.log`
        }*/]
    }

    server.register({
        register: require('good'),
        options: options
    }, errProcess)
}

function initSwagger(server){
    const options = {
        info: {
            'title': 'Test API Documentation',
            'version': '1.0.0',
        }
    };
    server.register([
        Inert,
        Vision,
        {
            'register': HapiSwagger,
            'options': options
        }
    ], errProcess);
}
