const state = {
  careManagerFlg: false,
  keyPersonFlg: false,
  homeCareServiceProviderFlg: false
};
const getters = {
  isCareManager(state) {
    return state.careManagerFlg;
  },
  isKeyPerson(state) {
    return state.keyPersonFlg;
  },
  isHomeCareServiceProvider(state) {
    return state.homeCareServiceProviderFlg;
  }
};
const mutations = {
  setCareManagerFlg(state) {
    state.careManagerFlg = true;
    state.keyPersonFlg = false;
    state.homeCareServiceProviderFlg = false;
  },
  setKeyPersonFlg(state) {
    state.careManagerFlg = false;
    state.keyPersonFlg = true;
    state.homeCareServiceProviderFlg = false;
  },
  setHomeCareServiceProviderFlg(state) {
    state.careManagerFlg = false;
    state.keyPersonFlg = false;
    state.homeCareServiceProviderFlg = true;
  },
};
const actions = {
  setCareManagerFlg(context) {
    context.commit('setCareManagerFlg');
  },
  setKeyPersonFlg(context, payload) {
    context.commit('setKeyPersonFlg');
  },
  setHomeCareServiceProviderFlg(context) {
    context.commit('setHomeCareServiceProviderFlg');
  },
};
 
export default {
  state,
  getters,
  mutations,
  actions
}