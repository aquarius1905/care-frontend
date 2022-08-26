import { api, careManagerApi } from '@/http-common'

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
  hasSupportOffices(state) {
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
  getCareManagerName(state) {
    return state.careManager.name;
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
  setLoggedInCareManagerData(state, payload) {
    state.careManagerAccessToken = payload.access_token;
    state.careManager = payload.care_manager;
  },
  resetCareManagerData(state) {
    state.careManagerAccessToken = null;
    state.careManager = null;
    state.supportOffices = null;
    console.log("resetCareManagerData");
  },
};
const actions = {
  async fetchSupportOffices(context) {
    if (context.state.supportOffices === null) {
      const { data } = await api.get('/home-care-support-offices');
      context.commit('setSupportOffices', data.data);
    }
  },
  async fetchCareManagerInfo(context) {
    const { data } = await careManagerApi
      .get('/me',
        {
          headers: {
            Authorization: `Bearer ${context.getters.getCareManagerAccessToken}`,
          }
        });
    if (data.result) {
      context.commit('setCareManager', data.care_manager);
    }
  },
  setLoggedInCareManagerData(context, payload) {
    context.commit('setLoggedInCareManagerData', payload);
  },
  resetCareManagerData(context) {
    context.commit('resetCareManagerData');
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