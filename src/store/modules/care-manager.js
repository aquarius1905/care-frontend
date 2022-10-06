import { careManagerAuthApi } from "@/plugins/axios";

const state = {
  careManagerAccessToken: null,
  loggedInCareManager: null,
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
  getLoggedInCareManagerData(state) {
    return state.loggedInCareManager;
  },
  getLoggedInCareManagerName(state) {
    console.log('getLoggedInCareManagerName');
    return state.loggedInCareManager.name;
  },
  emptyLoggedInCareManager(state) {
    return state.loggedInCareManager === null;
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
  setLoggedInCareManagerData(state, payload) {
    state.loggedInCareManager = payload;
    console.log('setLoggedInCareManagerData');
  },
  setCareManagerAccessToken(state, payload) {
    state.careManagerAccessToken = payload;
    console.log('setCareManagerAccessToken');
  },
  resetCareManager(state) {
    state.careManagerAccessToken = null;
    state.loggedInCareManager = null;
    state.visitTimes = null;
    state.detailFlg = false;
    state.selectedCareReceiver = null;
  },
  setDetailFlg(state, payload) {
    state.detailFlg = payload;
  },
  setSelectedCareReceiver(state, payload) {
    state.selectedCareReceiver = payload;
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