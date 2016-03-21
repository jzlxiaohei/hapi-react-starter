'use strict'
const joi = require('joi')
const Promise = require('bluebird')
const path = require('path')
const fs = require('fs')
const readFile = Promise.promisify(fs.readFile)

exports.register = function (server, options, next) {
    server.route({
        method: "get",
        path: '/',
        config:{
            description:'get posts list', notes:'注意这是首页',
            tags:['api'],
            validate:{
                query:{
                    offset : joi.number().integer().min(0).default(0).description('query offset'),
                    limit: joi.number().integer().default(10).description('query limit'),
                    order:joi.string().default('-created_at').description('query order')
                }
                //payload,path params
            },
            auth:false
        },
        handler:{
            async: async function(req,reply){
                const reactMarkUp = $reactViewEngine.renderToStaticMarkup('index')
                const text = await readFile(path.join(__dirname, './foo.txt'), 'utf-8');
                reply.view('index',{
                    title: text,
                    react: reactMarkUp
                })
            }
        }
    })


    server.route({
        method: "get",
        path: '/login',
        config:{
            auth:{mode:"try"}
        },
        handler:{
            async: async function(req,reply){
                console.log(req.auth)
                if(req.auth.isAuthenticated){
                    return reply.redirect('/')
                }
                console.log(req.yar)
                req.server.app.cache.set("1",{name:'zilong'},$config.sessionTtl,(err)=>{
                    if(err){return reply(err)}
                    req.cookieAuth.set({sid:"1"})
                    reply("success")
                })
            }
        }
    })

    server.route({
        method: "get",
        path: '/logout',
        config:{
            auth:false
        },
        handler:{
            async: async function(req,reply){
                req.cookieAuth.clear()
                reply.redirect('/login')
            }
        }
    })

    next()
}

exports.register.attributes = {
    name:'index',
    version:'1.0.0',
    description:'首页',
    author:'zilong'
}

