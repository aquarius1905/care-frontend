import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    careManagerAccessToken: null
  },
  getters: {
    getCareManagerAccessToken(state) {
      return state.careManagerAccessToken;
    },
    isCareManagerAuthenticated(state) {
      return state.careManagerAccessToken !== null
    }
  },
  mutations: {
    login(state, payload) {
      state.careManagerAccessToken = payload;
    },
    logout(state) {
      state.careManagerAccessToken = null;
    }
  },
  actions: {
    login(context, payload) {
      context.commit('login', payload);
    },
    logout(context) {
      context.commit('logout');
    }
  },
  modules: {
  }
})
