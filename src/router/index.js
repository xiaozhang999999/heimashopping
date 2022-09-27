import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 配置路由表
const routes = [
  {
   path: '/',
   redirect: '/login'
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

export default router
