import store from '@/store'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 配置路由表
const routes = [
  {
    path: '/',
    component: () => import('@/views/layout')
  },
  {
    path: '/reg',
    component: () => import('@/views/register')
    // webpack提供import函数来路由懒加载导入组件
    // 路由懒加载，就是页面路由由路劲切换到/reg，才去加载对应组件代码
    // 好长：让首页加载文件体积更新，打开更快
  },
  {
    path: '/login',
    component: () => import('@/views/login')
  }
]

const router = new VueRouter({
  routes
})

//全局布置守卫
//在全局前置守卫, 做判断, 有token但是无userInfo信息, 才发请求拿用户信息
router.beforeEach((to, from, next) => {
  const token = store.state.token
  if (token && !store.state.userInfo.username) {
    // 有token但是没有用户信息, 才去请求用户信息保存到vuex里
    // 调用actions里方法请求数据
    store.dispatch('initUserInfo')
    // initUserInfo 在store文件中
    // 下次切换页面vuex里有用户信息数据就不会重复请求用户信息
  }
  next() // 路由放行
})

export default router
