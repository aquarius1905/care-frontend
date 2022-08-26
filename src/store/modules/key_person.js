const state = {
  keyPersonAccessToken: null,
  keyPerson: null
};
const getters = {
  getKeyPersonAccessToken(state) {
    return state.keyPersonAccessToken;
  },
  isKeyPersonLoggedIn(state) {
    return state.keyPersonAccessToken !== null
  },
  getKeyPersonName(state) {
    return state.keyPerson.name;
  },
  getCareReceiversWithKeyPerson(state) {
    return state.keyPerson.care_receivers;
  }
};
const mutations = {
  setLoggedInKeyPersonData(state, payload) {
    state.keyPersonAccessToken = payload.access_token;
    state.keyPerson = payload.key_person;
  },
  resetKeyPersonData(state) {
    state.keyPersonAccessToken = null;
  },
};
const actions = {
  setLoggedInKeyPersonData(context, payload) {
    context.commit('setLoggedInKeyPersonData', payload);
  },
  resetKeyPersonData(context) {
    context.commit('resetKeyPersonData');
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}