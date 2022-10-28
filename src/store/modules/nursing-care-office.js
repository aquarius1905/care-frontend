import { nursingCareOfficeAuthApi } from "@/plugins/axios";

const state = {
  nursingCareOfficeAccessToken: null,
  loggedInNursingCareOffice: null,
  rehabilitationContents: null,
};
const getters = {
  getNursingCareOfficeAccessToken(state) {
    return state.nursingCareOfficeAccessToken;
  },
  isNursingCareOfficeLoggedIn(state) {
    return state.nursingCareOfficeAccessToken !== null
  },
  getLoggedInNursingCareOfficeName(state) {
    return state.loggedInNursingCareOffice.office_name;
  },
  hasLoggedInNursingCareOfficeName(state) {
    if (state.loggedInNursingCareOffice === null) {
      return false;
    }
    return state.loggedInNursingCareOffice.office_name !== null;
  },
  getLoggedInNursingCareOffice(state) {
    return state.loggedInNursingCareOffice;
  },
  getRehabilitationContents(state) {
    return state.rehabilitationContents;
  },
  emptyRehabilitationContents(state) {
    return state.rehabilitationContents === null;
  }
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
    state.rehabilitationContents = null;
  },
  setRehabilitationContents(state, payload) {
    state.rehabilitationContents = payload;
  }
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
  },
  async fetchNursingCareOfficeData(context) {
    try {
      const { data } = await nursingCareOfficeAuthApi.get(
        '/nursing-care-offices/me'
      );

      context.commit('setLoggedInNursingCareOfficeData', data.data);
    } catch (error) {
      alert("登録情報の取得に失敗しました");
    }
  },
  async fetchRehabilitationContents(context) {
    try {
      const { data } = await nursingCareOfficeAuthApi.get(
        '/rehabilitation-contents'
      );
      context.commit(
        'setRehabilitationContents',
        data.data
      );
    } catch (error) {
      console.log(error);
      alert("リハビリ内容の取得に失敗しました");
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}