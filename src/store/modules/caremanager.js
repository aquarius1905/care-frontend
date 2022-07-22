const state = {
  supportOffices: null
};
const getters = {
  getSupportOffices(state) {
    return state.supportOffices;
  },
  hasSupportOffices() {
    return state.supportOffices !== null;
  }
};
const mutations = {
  setSupportOffices(state, payload) {
    state.supportOffices = payload;
  }
};
const actions = {
  setSupportOffices(context, payload) {
    context.commit('setSupportOffices', payload);
  }
};
 
export default {
  state,
  getters,
  mutations,
  actions
}