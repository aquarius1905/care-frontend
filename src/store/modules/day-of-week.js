import { api } from '@/http-common';

const state = {
  dayOfWeeks: null,
};
const getters = {
  getDayOfWeeks(state) {
    return state.dayOfWeeks;
  },
  emptyDayOfWeeks(state) {
    return state.dayOfWeeks === null;
  },
};
const mutations = {
  setDayOfWeeks(state, payload) {
    state.dayOfWeeks = null;
    state.dayOfWeeks = payload;
  },
};
const actions = {
  async fetchDayOfWeeks(context) {
    const { data } = await api.get('/day-of-weeks');
    context.commit('setDayOfWeeks', data.data);
  }
};
 
export default {
  state,
  getters,
  mutations,
  actions
}