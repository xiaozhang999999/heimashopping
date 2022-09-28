import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
// 导入axios  getUserInfoAPI获取用户信息
import { getUserInfoAPI } from '@/api'



Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '', //定义变量token 保存token字符串
    userInfo: {} // 定义用户信息对象state
  },
  getters: {
  },
  mutations: {
    // 保存token 更新 token 的 mutation 函数  在views/login/index.vue的methods中
    updateToken (state, newToken) {
      state.token = newToken
    },
    // 更新用户的信息   updateUserInfo与下面actions的 updateUserInfo一致
    // userInfo是接口文档中获取用户基本信息的get/my/userinfo
    updateUserInfo (state, info) {
      state.userInfo = info
    }
  },
  actions: {
    // 定义初始化用户基本信息的 action 函数
    // getUserInfoAPI封装的axios函数在api文件中
    // initUserInfo 在router文件中
    async getUserInfoActions (store) {
      const res = await getUserInfoAPI()
      console.log(res)
      store.commit('updateUserInfo', res.data.data)
      }
  },
  // 配置为 vuex 的插件
  plugins: [createPersistedState() ],
  modules: {}
})

// 接口方法+actions获取用户的基本信息