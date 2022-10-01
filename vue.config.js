const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    host: 'localhost',
    port:8080,
    open: true, //启动项目自动打开网页
    // disableHostCheck: true,
    client: {
      // webSocketURL: 'ws://0.0.0.0:8080/ws',  //这里的 0.0.0.0代表的其实就是localhost（本机IP）
      webSocketURL: 'ws://localhost:8080/ws',  //这里的 0.0.0.0代表的其实就是localhost（本机IP）
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  }

//   devServer: {
//     open: true, //启动项目自动打开网页
//     host: 'localhost', //本地服务器访问的路径
//     port: 8800, //vue启动端口号，本地服务器访问的端口
//     https: false, //vue前端项目是否是https
//     hotOnly: false, //是否更新
//     // 跨域，解决前后端同源问题
//     proxy: {
//         '/api': {
//             // 目标路径（后端/服务器路径）
//             // target: 'https//www.bilibili.com/index/ding.json',
//             target: 'http://big-event-vue-api-t.itheima.net',
//             ws: false, //是否启用websockets
//             // 开启代理，允许跨域
//             changOrigin: true,
//             // 重写路径
//             pathRewrite: {
//                 '^/api': ''
//             }
//         }
//     }
// },
})

