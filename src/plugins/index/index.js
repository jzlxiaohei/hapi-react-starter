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
            description:'首页',
            notes:'首页',
            tags:['api'],
            validate:{
                query:{
                    a : joi.number().required().description('test a')
                }
            }
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

    next()
}

exports.register.attributes = {
    name:'index',
    version:'1.0.0',
    description:'首页',
    author:'zilong'
}

