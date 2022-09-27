import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '' //定义变量token 保存token字符串
  },
  getters: {
  },
  mutations: {
    // 保存token 更新 token 的 mutation 函数  在views/login/index.vue的methods中
    updateToken (state, newToken) {
      state.token = newToken
    }
  },
   // 配置为 vuex 的插件
  plugins: [createPersistedState()],
  actions: {
  },
  modules: {
  }
})
