import { api } from "@/plugins/axios";

const state = {
  careManagerAccessToken: null,
  careManager: null,
  visitTimes: null,
  detailFlg: false,
  selectedCareReceiver: null
};
const getters = {
  getCareManagerAccessToken(state) {
    return state.careManagerAccessToken;
  },
  isCareManagerLoggedIn(state) {
    return state.careManagerAccessToken !== null
  },
  getCareManager(state) {
    return state.careManager;
  },
  getLoggedInCareManagerName(state) {
    return state.careManager.name;
  },
  emptyCareManager(state) {
    return state.careManager === null;
  },
  getVisitTimes(state) {
    return state.visitTimes;
  },
  hasVisitTimes(state) {
    return state.visitTimes !== null;
  },
  isDetail(state) {
    return state.detailFlg;
  },
  getSelectedCareReceiver(state) {
    return state.selectedCareReceiver;
  },
  getSelectedCareReceiverId(state) {
    return state.selectedCareReceiver.id;
  },
  getSelectedCareReceiverName(state) {
    return state.selectedCareReceiver.name;
  },
};
const mutations = {
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
  setDetailFlg(state, payload) {
    state.detailFlg = payload;
  },
  setSelectedCareReceiver(state, payload) {
    state.selectedCareReceiver = null;
    state.selectedCareReceiver = payload;
  },
};
const actions = {
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
  },
  setDetailFlg(context, payload) {
    context.commit('setDetailFlg', payload);
  },
  setSelectedCareReceiver(context, payload) {
    context.commit('setSelectedCareReceiver', payload);
  },
};

export default {
  state,
  getters,
  mutations,
  actions
}