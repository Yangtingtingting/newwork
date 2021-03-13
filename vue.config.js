const  { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');  //webpack-bundle-analyzer 分析打包体积
let current_outputDir = '';
if (process.env.VUE_APP_ENV == 'uat') {
    // 开发环境
    current_outputDir = 'dist_uat';
} else if (process.env.VUE_APP_ENV == 'production') {
    // 生产环境
    current_outputDir = 'dist';
} else if (process.env.VUE_APP_ENV == 'gray') {
    // 灰度环境
    current_outputDir = 'dist_gray';
} else if (process.env.VUE_APP_ENV == 'development') {
    // 开发环境
    current_outputDir = 'dist_dev';
}
module.exports = {
    publicPath: './',
    outputDir: current_outputDir, //输出文件夹
    devServer: {
        // open: false,
        // host: 'localhost',
        // port: 8080,
        // https: false,
        proxy: {
            '/devapi': {
                // target: 'http://测试服地址', //测试服
                // target: 'https://灰度服地址', //灰度测试服务器22222222
                target: 'http://vpn.tube', //生产222
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/devapi': ''
                }
            }
        },
    },
    //其他配置....
    configureWebpack: {
        plugins: [
            //TODO: 灰度及生产环境的 包 不执行此插件 【防止jenkins打包不成功】
            // new BundleAnalyzerPlugin(), //webpack-bundle-analyzer 分析打包体积
        ]
    },
    // productionSourceMap: process.env.VUE_APP_ENV != 'production'
    productionSourceMap: false
}