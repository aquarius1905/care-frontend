const state = {
  careManagerFlg: false,
  careReceiverFlg: false,
  nursingCareOfficeFlg: false
};
const getters = {
  isCareManager(state) {
    return state.careManagerFlg;
  },
  isCareReceiver(state) {
    return state.careReceiverFlg;
  },
  isNursingCareOffice(state) {
    return state.nursingCareOfficeFlg;
  }
};
const mutations = {
  setCareManagerFlg(state) {
    state.careManagerFlg = true;
    state.careReceiverFlg = false;
    state.nursingCareOfficeFlg = false;
  },
  setCareReceiverFlg(state) {
    state.careManagerFlg = false;
    state.careReceiverFlg = true;
    state.nursingCareOfficeFlg = false;
  },
  setNursingCareOfficeFlg(state) {
    state.careManagerFlg = false;
    state.careReceiverFlg = false;
    state.nursingCareOfficeFlg = true;
  },
};
const actions = {
  setCareManagerFlg(context) {
    context.commit('setCareManagerFlg');
  },
  setCareReceiverFlg(context, payload) {
    context.commit('setCareReceiverFlg');
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