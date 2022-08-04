const state = {
  supportOffices: null,
  careManagerAccessToken: null,
};
const getters = {
  getSupportOffices(state) {
    return state.supportOffices;
  },
  hasSupportOffices() {
    return state.supportOffices !== null;
  },
  getCareManagerAccessToken(state) {
    return state.careManagerAccessToken;
  },
  isCareManagerLoggedIn(state) {
    return state.careManagerAccessToken !== null
  },
};
const mutations = {
  setSupportOffices(state, payload) {
    state.supportOffices = payload;
  },
  login(state, payload) {
    state.careManagerAccessToken = payload;
  },
  logout(state) {
    state.careManagerAccessToken = null;
  },
};
const actions = {
  setSupportOffices(context, payload) {
    context.commit('setSupportOffices', payload);
  },
  loginCareManager(context, payload) {
    context.commit('login', payload);
  },
  logoutCareManager(context) {
    context.commit('logout');
  }
};
 
export default {
  state,
  getters,
  mutations,
  actions
}