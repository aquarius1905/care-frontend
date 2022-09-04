import Vue from 'vue'
import Vuex from 'vuex'
import CreatePersistedState from 'vuex-persistedstate'
import CareLevels from "./modules/care_level"
import CareManager from "./modules/care_manager"
import CareReceiver from "./modules/care_receiver"
import Common from "./modules/common"
import DayOfWeek from "./modules/day_of_week"
import HomeCareServiceProvider from "./modules/home_care_service_provider"
import HomeCareService from "./modules/home_care_service"
import KeyPerson from "./modules/key_person"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    CareLevels,
    CareManager,
    CareReceiver,
    Common,
    DayOfWeek,
    HomeCareServiceProvider,
    HomeCareService,
    KeyPerson
  },
  plugins: [CreatePersistedState(
    { // ストレージのキーを指定
      key: 'appName',
      // ストレージの種類を指定
      storage: window.sessionStorage
    }
  )
  ]
})
