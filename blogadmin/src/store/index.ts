import {createStore} from 'vuex'

export default createStore({
  state: {
    //用户信息
    userInfo: {},

    //友链列表
    linkData: []
  },
  mutations: {
    //更变用户信息
    loginSuccess(state, userInfo) {
      state.userInfo = userInfo
    },
    //退出登录清除用户信息
    loginOut(state) {
      state.userInfo = {}
    },

    //更新友链信息
    updateLinkData(state, data) {
      state.linkData = data
    }
  },
  actions: {

  },
  modules: {}
})
