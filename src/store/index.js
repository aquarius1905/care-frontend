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
    }
  },
  mutations: {
    setCareManagerAccessToken(state, payload) {
      state.careManagerAccessToken = payload;
    }
  },
  actions: {
    setCareManagerAccessTokenAction(context, payload) {
      context.commit('setCareManagerToken', payload);
    }
  },
  modules: {
  }
})
