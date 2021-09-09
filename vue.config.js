/**
 * 当前是否为生产环境
 */
const IS_PROD = process.env.NODE_ENV === 'production'
// 获取Node环境启动时设置 可能为home 或者是 admin
let appName = process.argv.slice(0)[3].replace('--', '')
let outputPath = appName === 'home' ? 'home' : 'admin'
module.exports = {
  //运行目录：开发环境：都在根目录。生产环境，前台在根目录，后台在子目录下运行 ：TODO 目前未理解
  publicPath: IS_PROD
    ? outputPath == 'home'
      ? '/'
      : '../' + outputPath + '/'
    : '/',
  //编译输出目录
  outputDir: '../' + outputPath,
  //多页面配置
  pages: {
    index: {
      entry: 'src/pages/' + appName + '/main.js',
      template: `public/${appName}.html`,
      filename: 'index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'index', 'runtime~index'],
      title: appName === 'home' ? 'VUE3博客学习' : '博客的后台管理',
    },
  },
  devServer: {
    sockHost: 'localhost',
    disableHostCheck: true,
    port: 8080, // 端口号
    host: 'localhost',
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
    proxy: {
      '/apis': {
        /**已经修改了 */
        target: 'http://127.0.0.1:8090', // 需要请求的地址
        // target: process.env.VUE_APP_API_URL, // 需要请求的地址
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/apis': '', // 替换target中的请求地址，也就是说，在请求的时候，url用'/proxy'代替'http://ip.taobao.com'
        },
      },
      '/music': {
        target: 'https://music.liuzhijin.cn', // 需要请求的地址
        // target: process.env.VUE_APP_URL,   // 需要请求的地址
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/music': '', // 替换target中的请求地址，也就是说，在请求的时候，url用'/proxy'代替'http://ip.taobao.com'
        },
      },
      '/english': {
        target: 'http://sentence.iciba.com', // 需要请求的地址
        // target: process.env.VUE_APP_URL,   // 需要请求的地址
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/english': '', // 替换target中的请求地址，也就是说，在请求的时候，url用'/proxy'代替'http://ip.taobao.com'
        },
      },
    },
  },
  productionSourceMap: !IS_PROD,
  configureWebpack: (config) => {
    // 用cdn方式引入，则构建时要忽略相关资源
    config.externals = {
      echarts: 'echarts',
      // AMap: 'AMap',
    }

    if (IS_PROD) {
      //gzip压缩
      // config.plugins.push(new CompressionWebpackPlugin({
      //     algorithm: 'gzip',
      //     test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'), //匹配文件名
      //     threshold: 10240, //对超过10k的数据进行压缩
      //     minRatio: 0.8,
      //     deleteOriginalAssets: false //是否删除原文件
      // }));

      // 代码压缩
      config.optimization.minimizer[0].options.terserOptions.compress.warnings = false
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true
      config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = [
        'console.log',
      ]
    }
  },
  chainWebpack: (config) => {
    if (IS_PROD) {
      config.plugins.delete('prefetch')
      // 压缩代码
      config.optimization.minimize(true)
    }
  },
}
