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
      return state.careManagerAccessToken != null
    }
  },
  mutations: {
    setCareManagerAccessToken(state, payload) {
      state.careManagerAccessToken = payload;
    }
  },
  actions: {
    setCareManagerAccessTokenAction(context, payload) {
      context.commit('setCareManagerAccessToken', payload);
    }
  },
  modules: {
  }
})
