const state = {
  keyPersonAccessToken: null,
};
const getters = {
  getkeyPersonAccessToken(state) {
    return state.keyPersonAccessToken;
  },
  isKeyPersonLoggedIn(state) {
    return state.keyPersonAccessToken !== null
  },
};
const mutations = {
  login(state, payload) {
    state.keyPersonAccessToken = payload;
  },
  logout(state) {
    state.keyPersonAccessToken = null;
  },
};
const actions = {
  login(context, payload) {
    context.commit('login', payload);
  },
  logout(context) {
    context.commit('logout');
  }
};
 
export default {
  state,
  getters,
  mutations,
  actions
}