import { careManagerAuthApi } from "@/plugins/axios";

const state = {
  careManagerAccessToken: null,
  loggedInCareManager: null,
  selectedCareReceiver: null,
  detailFlg: false
};
const getters = {
  getCareManagerAccessToken(state) {
    return state.careManagerAccessToken;
  },
  isCareManagerLoggedIn(state) {
    return state.careManagerAccessToken !== null
  },
  getLoggedInCareManagerData(state) {
    return state.loggedInCareManager;
  },
  getLoggedInCareManagerName(state) {
    return state.loggedInCareManager.name;
  },
  hasLoggedInCareManagerName(state) {
    if (state.loggedInCareManager === null) {
      return false;
    }
    return state.loggedInCareManager.name !== null;
  },
  isCareManagerDetail(state) {
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
  setLoggedInCareManagerData(state, payload) {
    state.loggedInCareManager = payload;
  },
  setCareManagerAccessToken(state, payload) {
    state.careManagerAccessToken = payload;
  },
  setCareManagerDetailFlg(state, payload) {
    state.detailFlg = payload;
  },
  setSelectedCareReceiver(state ,payload) {
    state.selectedCareReceiver = payload;
  },
  resetCareManager(state) {
    state.careManagerAccessToken = null;
    state.loggedInCareManager = null;
    state.detailFlg = false;
    state.selectedCareReceiver = null;
  },
};
const actions = {
  setCareManagerAccessToken(context, payload) {
    context.commit('setCareManagerAccessToken', payload);
  },
  resetCareManager(context) {
    context.commit('resetCareManager');
  },
  setLoggedInCareManagerData(context, payload) {
    context.commit('setLoggedInCareManagerData', payload);
  },
  setCareManagerDetailFlg(context, payload) {
    context.commit('setCareManagerDetailFlg', payload);
  },
  setSelectedCareReceiver(context, payload) {
    context.commit('setSelectedCareReceiver', payload);
  },
  async fetchCareManagerData(context) {
    try {
      const { data } = await careManagerAuthApi.get(
        '/care-managers/me'
      );

      context.commit('setLoggedInCareManagerData', data.data);
    } catch (error) {
      alert("登録情報の取得に失敗しました");
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}