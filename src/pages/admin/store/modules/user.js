const user = {
  state: {
    user: {},
    token: localStorage.getItem('token') || '',
    validate: false,
  },
  mutations: {
    setToken(state, data) {
      //写入token
      state.token = data
    },
    userInfo(state, data) {
      //写入个人信息
      state.user = { ...state.user, ...data }
    },
    setValid(state, valid) {
      state.validate = valid
    },
    logOut(state) {
      //退出
      state.token = ''
      state.user = ''
    },
  },
  actions: {
    setToken({ commit }, data) {
      commit('setToken', data)
    },
    async userInfo({ commit }, info) {
      commit('userInfo', info)
    },
    logOut({ commit }) {
      commit('logOut')
    },
  },
}
export default user
