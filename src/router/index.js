import store from '@/store'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 配置路由表
const routes = [
  // {
  //   path: '/',
  //   component: () => import('@/views/layout')
  // },
  // {
  //   path: '/reg',
  //   component: () => import('@/views/register')
  //   // webpack提供import函数来路由懒加载导入组件
  //   // 路由懒加载，就是页面路由由路劲切换到/reg，才去加载对应组件代码
  //   // 好长：让首页加载文件体积更新，打开更快
  // },
  // {
  //   path: '/login',
  //   component: () => import('@/views/login')
  // },

  {
    path: '/',
    component: () => import('@/views/layout'),
    redirect: '/home', // 默认显示首页的二级路由
    children: [
      {
        path: 'home',
        component: () => import('@/views/home')
      },
      {
        path: 'user-info', // 这里必须叫user-info, 因为侧边栏导航切换的是它
        component: () => import('@/views/user/userInfo')
      },
      {
        path: 'art-cate', // 文章分类
        component: () => import('@/views/article/artCate')
    }
    ]
  },
]

const router = new VueRouter({
  routes
})
export default router


// 无需验证token的页面
const whiteList = ['/login', '/reg']

router.beforeEach((to, from, next) => {
  const token = store.state.token
  if (token) {
    // 如果有token, 证明已登录
    if (!store.state.userInfo.username) {
      // 有token但是没有用户信息, 才去请求用户信息保存到vuex里
      // 调用actions里方法请求数据
      store.dispatch('initUserInfo')
      // 下次切换页面vuex里有用户信息数据就不会重复请求用户信息
    }
    next() // 路由放行
  } else {
    // 如果无token
    // 如果去的是白名单页面, 则放行
    if (whiteList.includes(to.path)) {
      next()
    } else {
      // 如果其他页面请强制拦截并跳转到登录页面
      next('/login')
    }
  }
})
