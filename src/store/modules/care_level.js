import { api } from '@/http-common';

const state = {
  careLevels: null,
};
const getters = {
  getNeededSupportLevels(state) {
    const care_levels = state.careLevels;
    return care_levels.slice(0, 2);
  },
  getNeededCareLevels(state) {
    const care_levels = state.careLevels;
    return care_levels.slice(2);
  },
  hasCareLevels(state) {
    return state.careLevels !== null;
  },
};
const mutations = {
  setCareLevels(state, payload) {
    state.careLevels = payload;
  },
};
const actions = {
  async fetchCareLevels(context) {
    console.log("fetchCareLevels");
    const { data } = await api.get('/care-levels');
    context.commit('setCareLevels', data.data);
  }
};
 
export default {
  state,
  getters,
  mutations,
  actions
}