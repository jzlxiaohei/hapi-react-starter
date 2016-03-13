module.exports = {
    isProduction: process.env.NODE_ENV === 'production',
    isErrToPage: false,
    appName: "your-app",
    errLogPath: process.cwd(),
    //pm2 在fork mode下会设置 process.envNODE_APP_INSTANCE,标识是那个实例
    nodeAppInstance: process.env.NODE_APP_INSTANCE || 0,
    apiHost: 'localhost',
    apiPort: '3333',
    webHost: 'localhost',
    webPort: '3333',
    swaggerEnabled:false
}