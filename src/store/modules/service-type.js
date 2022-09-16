import { api } from '@/http-common'

const state = {
  serviceTypes: null,
};
const getters = {
  getServiceTypes(state) {
    return state.serviceTypes;
  },
  emptyServiceTypes(state) {
    return state.serviceTypes === null;
  }
};
const mutations = {
  setServiceTypes(state, payload) {
    state.serviceTypes = null;
    state.serviceTypes = payload;
  },
};
const actions = {
  async fetchServiceTypes(context) {
    const { data } = await api.get('/service-types');
    context.commit('setServiceTypes', data.data);
  },
};

export default {
  state,
  getters,
  mutations,
  actions
}