const state = {
  currentCareReceiver: null,
  careReceiverAccessToken: null,
  loggedInCareReceiver: null
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
  getLoggedInCareReceiver(state) {
    return state.loggedInCareReceiver;
  },
  getLoggedInCareReceiverName(state) {
    return state.loggedInCareReceiver.name;
  },
  getLoggedInKeyPersonName(state) {
    return state.loggedInCareReceiver.keyperson_name;
  },
};
const mutations = {
  setCurrentCareReceiver(state, payload) {
    state.currentCareReceiver = null;
    state.currentCareReceiver = payload;
  },
  setLoggedInCareReceiver(state, payload) {
    state.careReceiverAccessToken = payload.access_token;
    state.loggedInCareReceiver = payload.care_receiver;
  },
  resetCareReceiver(state) {
    state.careReceiverAccessToken = null;
    state.loggedInCareReceiver = null;
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