import { careReceiverAuthApi } from "@/plugins/axios";
import dayjs from 'dayjs'

const state = {
    careReceiverAccessToken: null,
    loggedInCareReceiver: null,
    weeklyServiceSchedules: null,
    careManagerInCharege: null,
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
  },
  getCareManagerInCharge(state) {
    return state.loggedInCareReceiver.care_manager;
  },
  getCareManagerVisitDateTime(state) {
    const visit_datetime = state.loggedInCareReceiver.visit_datetime;
    if (visit_datetime == null) {
      return '未定';
    }
    return dayjs(visit_datetime.date).format('YYYY年MM月DD日（ddd）')
      + dayjs(visit_datetime.time).format('HH時mm分');
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
    state.careManagerInCharege = null;
  },
  setInfoAboutCareReceiver(state, payload) {
    state.loggedInCareReceiver = payload;
    state.weeklyServiceSchedules = payload.weekly_service_schedules;
  }
};
const actions = {
  setCareReceiverAccessToken(context, payload) {
    context.commit('setCareReceiverAccessToken', payload);
  },
  resetCareReceiver(context) {
    context.commit('resetCareReceiver');
  },
  async fetchCareReceiverData(context) {
    try {
      const { data } = await careReceiverAuthApi.get(
        '/care-receivers/me'
      );
      
      context.commit('setInfoAboutCareReceiver', data.data);
    } catch (error) {
      alert("登録情報の取得に失敗しました");
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions
}