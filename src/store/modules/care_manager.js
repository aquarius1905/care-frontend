import axios from 'axios'

const state = {
  supportOffices: null,
  careManagerAccessToken: null,
  careManager: null,
  visitTimes: null
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
  getCareManager(state) {
    return state.careManager;
  },
  hasCareManager(state) {
    return state.careManager !== null;
  },
  getVisitTimes(state) {
    return state.visitTimes;
  },
  hasVisitTimes(state) {
    return state.visitTimes !== null;
  }
};
const mutations = {
  setSupportOffices(state, payload) {
    state.supportOffices = payload;
  },
  setCareManager(state, payload) {
    state.careManager = payload;
  },
  login(state, payload) {
    state.careManagerAccessToken = payload;
  },
  logout(state) {
    state.careManagerAccessToken = null;
    state.careManager = null;
    state.supportOffices = null;
  },
};
const actions = {
  async fetchSupportOffices(context) {
    const { data } = await axios
      .get(`${process.env.VUE_APP_API_ORIGIN}/home-care-support-offices`);
    
    context.commit('setSupportOffices', data.data);
  },
  async fetchCareManagerInfo(context) {
    const { data } = await axios
      .get(`${process.env.VUE_APP_API_ORIGIN}/care-managers/me`,
        {
          headers: {
            Authorization: `Bearer ${context.getters.getCareManagerAccessToken}`,
          }
        });
    if (data.result) {
      context.commit('setCareManager', data.care_manager);
    }
  },
  loginCareManager(context, payload) {
    context.commit('login', payload);
  },
  logoutCareManager(context) {
    context.commit('logout');
  },
  setCareManager(context, payload) {
    context.commit('setCareManager', payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}