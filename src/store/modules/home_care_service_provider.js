const state = {
  homeCareServiceProviderAccessToken: null,
  homeCareServiceProvider: null
};
const getters = {
  getHomeCareServiceProviderAccessToken(state) {
    return state.homeCareServiceProviderAccessToken;
  },
  isHomeCareServiceProviderLoggedIn(state) {
    return state.homeCareServiceProviderAccessToken !== null
  }
};
const mutations = {
  login(state, payload) {
    state.homeCareServiceProviderAccessToken = payload;
  },
  logout(state) {
    state.homeCareServiceProviderAccessToken = null;
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