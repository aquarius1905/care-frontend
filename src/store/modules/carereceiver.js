const state = {
  careReceiver: {
    last_name: null,
    first_name: null,
    last_name_furigana: null,
    first_name_furigana: null,
    post_code: null,
    address: null,
    birthday: null,
    care_level: 0
  },
  keyPerson: {
    last_name: null,
    first_name: null,
    last_name_furigana: null,
    first_name_furigana: null,
    relationship: null,
    email: null,
    tel: null
  }
};
const getters = {
  getCareReceiver(state) {
    return state.careReceiver;
  },
  getKeyPerson(state) {
    return state.keyPerson;
  }
};
const mutations = {
  setCareReceiver(state, payload) {
    state.careReceiver = payload;
  },
  setKeyPerson(state, payload) {
    state.keyPerson = payload;
  }
};
const actions = {
};
 
export default {
  state,
  getters,
  mutations,
  actions
}