const state = {
  careManagerFlg: false,
  keyPersonFlg: false,
  nursingCareOfficeFlg: false
};
const getters = {
  isCareManager(state) {
    return state.careManagerFlg;
  },
  isKeyPerson(state) {
    return state.keyPersonFlg;
  },
  isNursingCareOffice(state) {
    return state.nursingCareOfficeFlg;
  }
};
const mutations = {
  setCareManagerFlg(state) {
    state.careManagerFlg = true;
    state.keyPersonFlg = false;
    state.nursingCareOfficeFlg = false;
  },
  setKeyPersonFlg(state) {
    state.careManagerFlg = false;
    state.keyPersonFlg = true;
    state.nursingCareOfficeFlg = false;
  },
  setNursingCareOfficeFlg(state) {
    state.careManagerFlg = false;
    state.keyPersonFlg = false;
    state.nursingCareOfficeFlg = true;
  },
};
const actions = {
  setCareManagerFlg(context) {
    context.commit('setCareManagerFlg');
  },
  setKeyPersonFlg(context, payload) {
    context.commit('setKeyPersonFlg');
  },
  setNursingCareOfficeFlg(context) {
    context.commit('setNursingCareOfficeFlg');
  },
};
 
export default {
  state,
  getters,
  mutations,
  actions
}