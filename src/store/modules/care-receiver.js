import { careReceiverAuthApi } from "@/plugins/axios";

const state = {
    careReceiverAccessToken: null,
    loggedInCareReceiver: null,
    weeklyServiceSchedules: null
};
const getters = {
  getCareReceiverAccessToken(state) {
    return state.careReceiverAccessToken;
  },
  isCareReceiverLoggedIn(state) {
    return state.careReceiverAccessToken !== null
  },
  getLoggedInCareReceiver(state) {
    return state.loggedInCareReceiver;
  },
  getLoggedInCareReceiverName(state) {
    return state.loggedInCareReceiver.name;
  },
  getLoggedInKeyPersonName(state) {
    return state.loggedInCareReceiver.keyperson_name;
  },
  emptyWeeklyServiceSchedules(state) {
    return state.weeklyServiceSchedules === null;
  },
  getWeeklyServiceSchedules(state) {
    return state.weeklyServiceSchedules;
  },
};
const mutations = {
  setCareReceiverAccessToken(state, payload) {
    state.careReceiverAccessToken = payload;
  },
  setLoggedInCareReceiverData(state, payload) {
    state.loggedInCareReceiver = payload;
  },
  resetCareReceiver(state) {
    state.careReceiverAccessToken = null;
    state.loggedInCareReceiver = null;
    state.weeklyServiceSchedules = null;
  },
  setWeeklyServiceSchedules(state, payload) {
    state.weeklyServiceSchedules = payload;
  }
};
const actions = {
  setCareReceiverAccessToken(context, payload) {
    context.commit('setCareReceiverAccessToken', payload);
  },
  setLoggedInCareReceiverData(context, payload) {
    context.commit('setLoggedInCareReceiverData', payload);
  },
  resetCareReceiver(context) {
    context.commit('resetCareReceiver');
  },
  async fetchWeeklyServiceSchedules(context, payload) {
    try {
      const params = {
        care_receiver_id: payload
      }
      const { data } = await careReceiverAuthApi.get(
        '/weekly-service-schedules',
        { params }
      );

      context.commit('setWeeklyServiceSchedules', data.data);

    } catch (error) {
        console.log(error);
        alert('週間サービス計画表のデータ取得に失敗しました');
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}