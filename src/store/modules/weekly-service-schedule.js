import { api } from '@/http-common';
import store from '../index';

const state = {
  dayOfWeeks: null,
  serviceTypes: null,
};
const getters = {
  getDayOfWeeks(state) {
    return state.dayOfWeeks;
  },
  getServiceTypes(state) {
    return state.serviceTypes;
  },
};
const mutations = {
  setDayOfWeeks(state, payload) {
    state.dayOfWeeks = null;
    state.dayOfWeeks = payload;
  },
  setServiceTypes(state, payload) {
    state.serviceTypes = null;
    state.serviceTypes = payload;
  },
};
const actions = {
  async fetchDayofweeksAndServicetypes(context) {
    api.defaults.headers.common['Authorization']
      = 'Bearer ' + store.getters.getCareManagerAccessToken;
    const { data } = await api.get('/dayofweeks-and-servicetypes');
    context.commit('setDayOfWeeks', data.day_of_weeks);
    context.commit('setServiceTypes', data.service_types);
  },
};
 
export default {
  state,
  getters,
  mutations,
  actions
}