import Vue from 'vue'
import Vuex from 'vuex'
import CareManager from "./modules/care_manager"
import KeyPerson from "./modules/key_person"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    CareManager,
    KeyPerson
  }
})
