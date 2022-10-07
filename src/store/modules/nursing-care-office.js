const state = {
  nursingCareOfficeAccessToken: null,
  loggedInNursingCareOffice: null
};
const getters = {
  getNursingCareOfficeAccessToken(state) {
    return state.nursingCareOfficeAccessToken;
  },
  isNursingCareOfficeLoggedIn(state) {
    return state.nursingCareOfficeAccessToken !== null
  },
  getLoggedInContactPersonName(state) {
    return state.loggedInNursingCareOffice.name;
  },
  hasLoggedInContactPersonName(state) {
    if (state.loggedInNursingCareOffice === null) {
      return false;
    }
    return state.loggedInNursingCareOffice.name !== null;
  },
  getLoggedInNursingCareOffice(state) {
    return state.loggedInNursingCareOffice;
  },
};
const mutations = {
  setNursingCareOfficeAccessToken(state, payload) {
    state.nursingCareOfficeAccessToken = payload;
  },
  setLoggedInNursingCareOfficeData(state, payload) {
    state.loggedInNursingCareOffice = payload;
  },
  resetNursingCareOffice(state) {
    state.nursingCareOfficeAccessToken = null;
    state.loggedInNursingCareOffice = null;
  },
};
const actions = {
  setNursingCareOfficeAccessToken(context, payload) {
    context.commit('setNursingCareOfficeAccessToken', payload);
  },
  setLoggedInNursingCareOfficeData(context, payload) {
    context.commit('setLoggedInNursingCareOfficeData', payload);
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