import { api } from '@/http-common'

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
  setLoggedInCareManager(state, payload) {
    state.careManagerAccessToken = payload.access_token;
    state.careManager = payload.care_manager;
  },
  resetCareManager(state) {
    state.careManagerAccessToken = null;
    state.careManager = null;
    state.supportOffices = null;
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
    const { data } = await api.get('/care-managers/me',
        {
          headers: {
            Authorization: `Bearer ${context.getters.getCareManagerAccessToken}`,
          }
        });
    if (data.result) {
      context.commit('setCareManager', data.care_manager);
    }
  },
  setLoggedInCareManager(context, payload) {
    context.commit('setLoggedInCareManager', payload);
  },
  resetCareManager(context) {
    context.commit('resetCareManager');
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