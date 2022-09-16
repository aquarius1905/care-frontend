const state = {
  nursingCareOfficeAccessToken: null,
  nursingCareOffice: null
};
const getters = {
  getNursingCareOfficeAccessToken(state) {
    return state.nursingCareOfficeAccessToken;
  },
  isNursingCareOfficeLoggedIn(state) {
    return state.nursingCareOfficeAccessToken !== null
  },
  getContactPersonNameOfNursingCareOffice(state) {
    return state.nursingCareOffice.name;
  },
};
const mutations = {
  setLoggedInNursingCareOffice(state, payload) {
    state.nursingCareOfficeAccessToken = payload.access_token;
    state.nursingCareOffice = payload.nursing_care_office;
  },
  resetNursingCareOffice(state) {
    state.nursingCareOfficeAccessToken = null;
    state.nursingCareOffice = null;
  },
};
const actions = {
  setLoggedInNursingCareOffice(context, payload) {
    context.commit('login', payload);
  },
  resetNursingCareOffice(context) {
    context.commit('resetNursingCareOffice');
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}