import Vue from 'vue'
import Vuex from 'vuex'
import CareLevels from "./modules/care_levels"
import CareManager from "./modules/care_manager"
import KeyPerson from "./modules/key_person"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    CareLevels,
    CareManager,
    KeyPerson
  }
})
