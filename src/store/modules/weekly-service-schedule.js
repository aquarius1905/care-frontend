import { careManagerAuthApi } from "@/plugins/axios";

const state = {
  dayOfWeeks: ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"],
  serviceTypes: null,
};
const getters = {
  getDayOfWeeks(state) {
    return state.dayOfWeeks;
  },
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
  async fetchServicetypes(context) {
    const { data } = await careManagerAuthApi.get(
      '/service-types'
    );
    context.commit('setServiceTypes', data.service_types);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}