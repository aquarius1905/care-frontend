const state = {
  currentCareReceiver: null,
  careReceiverAccessToken: null,
  careReceiver: null
};
const getters = {
  getCurrentCareReceiver(state) {
    return state.currentCareReceiver;
  },
  getCurrentCareReceiverId(state) {
    return state.currentCareReceiver.id;
  },
  getCurrentCareReceiverName(state) {
    return state.currentCareReceiver.name;
  },
  getCareReceiverAccessToken(state) {
    return state.careReceiverAccessToken;
  },
  isCareReceiverLoggedIn(state) {
    return state.careReceiverAccessToken !== null
  },
  getCareReceiverName(state) {
    return state.careReceiver.name;
  },
  getCareReceiversWithCareReceiver(state) {
    return state.careReceiver.care_receivers;
  }
};
const mutations = {
  setCurrentCareReceiver(state, payload) {
    state.currentCareReceiver = null;
    state.currentCareReceiver = payload;
  },
  setLoggedInCareReceiver(state, payload) {
    state.careReceiverAccessToken = payload.access_token;
    state.careReceiver = payload.care_receiver;
  },
  resetCareReceiver(state) {
    state.careReceiverAccessToken = null;
    state.careReceiver = null;
  },
};
const actions = {
  setCurrentCareReceiver(context, payload) {
    context.commit('setCurrentCareReceiver', payload);
  },
  setLoggedInCareReceiver(context, payload) {
    context.commit('setLoggedInCareReceiver', payload);
  },
  resetCareReceiver(context) {
    context.commit('resetCareReceiver');
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}