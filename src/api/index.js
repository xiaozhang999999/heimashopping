// 封装的axios函数
// 封装的是具体的接口请求方法
// 注意：每个方法只负责请求一个url地址
import request from '@/utils/request'
import store from '@/store'
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

/**
 * 获取-用户信息
 * @returns Promise 对象
 */
// getUserInfoAPI，定义接口方法, 用于请求用户信息数据
export const getUserInfoAPI = () => {
  return request({
    url: '/my/userinfo',  
    // GET/my/userinfo 是接口文档中获取用户基本资料的请求调式方式
    // method不写默认就是‘get’方式请求
    // 传参给后台;params(查询字符串query) data(请求体body) header(请求头)
    headers: {
      // Authorization 是接口地址里面的请求参数名
      // this.$store.state.token  这里的this不是组件对象不能用this.$store拿到store对象
      Authorization: store.state.token
    }
  })
}

/**
 * 获取-侧边栏菜单数据
 * @returns Promise对象
 */
 export const getMenusAPI = () => {
  return request({
    url: '/my/menus',
    headers: {
      Authorization: store.state.token
    }
  })
}

/**
 * 更新-用户基本资料
 * @param {*} param0 { id: 用户id, email: 用户邮箱, nickname: 用户昵称, user_pic: 用户头像地址, username: 用户名 }
 * @returns Promise对象
 */
 export const updateUserInfoAPI = ({ id, email, nickname, user_pic, username }) => {
  return request({
    url: '/my/userinfo',
    method: 'PUT',
    data: {
      id,
      email,
      nickname,
      user_pic,
      username
    }
  })
}

/**
 * 获取文章列表
 * @param {*} param0 { pagenum: 当前页码数, pagesize: 当前页条数, cate_id: 文章分类id, state: 文章状态 }
 * @returns Promise对象
 */
 export const getArticleListAPI = ({ pagenum, pagesize, cate_id, state }) => {
  return request({
    url: '/my/article/list',
    params: {
      pagenum,
      pagesize,
      cate_id,
      state
    }
  })
}

/**
 * 获取-文章分类
 * @returns Promise对象
 */
 export const getArtCateListAPI = () => {
  return request({
    url: '/my/cate/list'
  })
}

/**
 * 增加-文章分类
 * @param {*} param0 { cate_name: 文章分类名字, cate_alias: 文章分类别名 }
 * @returns Promise对象
 */
 export const addArtCateAPI = ({ cate_name, cate_alias }) => {
  return request({
    url: '/my/cate/add',
    method: 'POST',
    data: {
      cate_name,
      cate_alias
    }
  })
}
