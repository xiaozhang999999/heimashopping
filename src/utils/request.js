/* 基于axios封装，网络请求的函数 */
import axios from 'axios'
import store from '../store'
// 创建一个自定的axios方法(比原axios多了个基地址)
// 比如：http://big-event-vue-api-t.itheima.net/api/reg，去掉后面的/api/reg就是基地址
// axios函数请求的url地址前面会被拼接基地址, 然后axios请求baseURL+url后台完整地址

const myAxios = axios.create({
  baseURL: 'http://big-event-vue-api-t.itheima.net'
})

// 导出自定义的axios方法, 供外面调用传参发请求
export default myAxios


// 白名单: 不需要携带token的api地址
const whiteAPIList = ['/api/reg', '/api/login']

// 定义请求拦截器
myAxios.interceptors.request.use(function (config) {
  if (!whiteAPIList.includes(config.url)) {
    // 为请求头挂载 Authorization 字段
    config.headers.Authorization = store.state.token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})