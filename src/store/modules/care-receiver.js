import { careReceiverAuthApi } from "@/plugins/axios";

const state = {
    careReceiverAccessToken: null,
    loggedInCareReceiver: null,
    weeklyServiceSchedules: null,
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
  hasLoggedInCareReceiverName(state) {
    if (state.loggedInCareReceiver === null) {
      return false;
    }
    return state.loggedInCareReceiver.name !== null
  },
  getLoggedInKeyPersonName(state) {
    return state.loggedInCareReceiver.keyperson_name;
  },
  hasLoggedInKeyPersonName(state) {
    if (state.loggedInCareReceiver === null) {
      return false;
    }
    return state.loggedInCareReceiver.keyperson_name !== null
  },
  emptyWeeklyServiceSchedules(state) {
    return state.weeklyServiceSchedules === null;
  },
  getWeeklyServiceSchedules(state) {
    return state.weeklyServiceSchedules;
  }
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
  async fetchCareReceiverData(context) {
    try {
      const { data } = await careReceiverAuthApi.get(
        '/care-receivers/me'
      );

      context.commit('setLoggedInCareReceiverData', data.data);
    } catch (error) {
      alert("登録情報の取得に失敗しました");
    }
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