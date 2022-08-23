const state = {
  currentCareReceiver: null,
};
const getters = {
  getCurrentCareReceiver(state) {
    return state.currentCareReceiver;
  },
};
const mutations = {
  setCurrentCareReceiver(state, payload) {
    state.currentCareReceiver = null;
    state.currentCareReceiver = payload;
  },
};
const actions = {
  setCurrentCareReceiver(context, payload) {
    context.commit('setCurrentCareReceiver', payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}