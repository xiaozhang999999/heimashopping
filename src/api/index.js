// 封装的axios函数
// 封装的是具体的接口请求方法
// 注意：每个方法只负责请求一个url地址
import request from '@/utils/request'
// 形参obj的值 obj = { username:'', password: '', repassword: '' }
// 左侧（解构的目标）想要对象解构赋值（下面是语法），右边（解构的源）
// { username:username变量名, password: 变量名, repassword: 变量名 } = { username:'', password: '', repassword: '' }
// 函数形参的obj就改成对象解构，接收传入的数据对象
//  { username: username, password: password, repassword: repassword }
// key是传入的对象key匹配，value是变量名，接收外面传入的值
// ES6规定，key和value变量名同名时，可以简写（key即使key也是value）

/**
 * 注册接口
 * @param {*} param0 { username: 用户名, password: 密码 }
 * @returns Promise对象
 */

export const registerAPI = ({ username, password, repassword }) => {
  // ({ 这里也可以用obj替代，但是没有具名化，显得很低级 })
  // registerAPI   封装的对象
  return request({
    // 这里先用这个接口测试下, 如果url以http开头会忽略baseURL, axios直接请求此地址
    url: '/api/reg',
    method: 'post',
    // axios传参params,data
    // params的对象参数名和值，axios源码会把参数和值，拼接在url?后面给后台（query查询字符串）
    // data的对象参数名和值，axios源码会把参数和值，拼接在请求体里（body参数）
    data: {
      username,
      password,
      repassword
    }
  })
}
  

/**
 * @param {*} param0 { username: 用户名, password: 密码 }
 * @returns  Promise对象
 */

 export const loginAPI = ({ username, password }) => {
  return request({
    url: '/api/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}