export default {
  namespaced: true,
  state: {
    user: null,
    token: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {},
  getters: {
    getUserName(state) {
      return state.user.username;
    },
    getToken(state) {
      return state.token;
    },
    getUserRole(state) {
      return state.user.roleId;
    },
  },
};
