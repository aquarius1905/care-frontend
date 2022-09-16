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
  setLoggedInKeyPerson(state, payload) {
    state.keyPersonAccessToken = payload.access_token;
    state.keyPerson = payload.key_person;
  },
  resetKeyPerson(state) {
    state.keyPersonAccessToken = null;
    state.keyPerson = null;
  },
};
const actions = {
  setLoggedInKeyPerson(context, payload) {
    context.commit('setLoggedInKeyPerson', payload);
  },
  resetKeyPerson(context) {
    context.commit('resetKeyPerson');
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}