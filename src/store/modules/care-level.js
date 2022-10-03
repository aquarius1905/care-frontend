import { api } from "@/plugins/axios";

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
  emptyCareLevels(state) {
    return state.careLevels === null;
  },
};
const mutations = {
  setCareLevels(state, payload) {
    state.careLevels = payload;
    console.log(state.careLevels);
  },
};
const actions = {
  async fetchCareLevels(context) {
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