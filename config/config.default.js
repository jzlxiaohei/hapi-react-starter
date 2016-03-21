module.exports = {
    isProduction: process.env.NODE_ENV === 'production',
    isErrToPage: false,
    appName: "your-app",
    errLogPath: process.cwd(),
    /** pm2 在fork mode下会设置 process.envNODE_APP_INSTANCE,标识是那个实例 **/
    nodeAppInstance: process.env.NODE_APP_INSTANCE || 0,
    swaggerEnabled: false,
    redisHost: '127.0.0.1',
    redisPort: 6379,
    host:'localhost',
    port:'3333',
    sessionTtl:1000*60*60*24*3,
    sessionPassword:'password-should-be-32-characters',
    /** redis 真正的key是 `redisPrefix`:`segment`:`key` **/
    redisPrefix:'hapi-cache'
}