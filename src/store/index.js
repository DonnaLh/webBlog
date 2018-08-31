import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
//定义一个容器

let store = new Vuex.Store({
  state: {
    isLogin: false,
    userName: ''
  },
  mutations: {
    judjeLogin(state){
      state.isLogin = true
    },
    confirmLogout(state){
      state.isLogin = false
      state.userName = ""
    },
    noteName(state,payload){
      state.userName = payload.name
    }
  }
})
export default store
