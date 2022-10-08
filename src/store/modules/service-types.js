import { api, careManagerAuthApi } from "@/plugins/axios";

const state = {
  serviceTypes: null,
  serviceTypesWithNursingCareOffices: null
};
const getters = {
  getServiceTypes(state) {
    return state.serviceTypes;
  },
  getServiceTypesWithNursingCareOffices(state) {
    return state.serviceTypesWithNursingCareOffices;
  },
  emptyServiceTypes(state) {
    return state.serviceTypes === null;
  },
  emptyServiceTypesWithNursingCareOffices(state) {
    return state.serviceTypesWithNursingCareOffices === null;
  }
};
const mutations = {
  setServiceTypes(state, payload) {
    state.serviceTypes = payload;
  },
  setServiceTypesWithNursingCareOffices(state, payload) {
    state.serviceTypesWithNursingCareOffices = payload;
  }
};
const actions = {
  async fetchServiceTypes(context) {
    const { data } = await api.get(
      '/service-types'
    );
    context.commit('setServiceTypes', data.data);
  },
  async fetchServiceTypesWithNursingCareOffices(context) {
    const { data } = await careManagerAuthApi.get(
      '/service-types/nursing-care-offices'
    );
    context.commit(
      'setServiceTypesWithNursingCareOffices',
      data.data
    );
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}