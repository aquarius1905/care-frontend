import axios from 'axios'

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
    const { data } = await axios.get(`${process.env.VUE_APP_API_ORIGIN}/care-levels`);
    context.commit('setCareLevels', data.data);
  }
};
 
export default {
  state,
  getters,
  mutations,
  actions
}