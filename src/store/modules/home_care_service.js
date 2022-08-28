import { api } from '@/http-common'

const state = {
  homeCareServices: {},
};
const getters = {
  getHomeCareServices(state) {
    return state.homeCareServices;
  },
  hasHomeCareServices(state) {
    return state.homeCareServices !== null;
  }
};
const mutations = {
  setHomeCareServices(state, payload) {
    state.homeCareServices = null;
    state.homeCareServices = payload;
    console.log(typeof(state.homeCareServices));
  },
};
const actions = {
  async fetchHomeCareServices(context) {
    const { data } = await api.get('/home-care-services');
    context.commit('setHomeCareServices', data.data);
  },
};

export default {
  state,
  getters,
  mutations,
  actions
}