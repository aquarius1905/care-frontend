const state = {
  keyPersonAccessToken: null,
  keyPerson: null
};
const getters = {
  getKeyPersonAccessToken(state) {
    return state.keyPersonAccessToken;
  },
  isKeyPersonLoggedIn(state) {
    return state.keyPersonAccessToken !== null
  },
  getKeyPersonName(state) {
    return state.keyPerson.name;
  }
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
  loginKeyPerson(context, payload) {
    context.commit('login', payload);
  },
  logoutKeyPerson(context) {
    context.commit('logout');
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}