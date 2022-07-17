const state = {
  careManager: {
    last_name: null,
    first_name: null,
    last_name_furigana: null,
    first_name_furigana: null,
    support_office: null,
    registration_number: null,
    email: null,
    tel: null,
    password: null
  }
};
const getters = {
  getCareManager(state) {
    return state.careManager;
  }
};
const mutations = {
  setCareManager(state, payload) {
    state.careManager = payload;
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