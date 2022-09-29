import Vue from 'vue'
import Vuex from 'vuex'
import CreatePersistedState from 'vuex-persistedstate'
import CareLevels from "./modules/care-level"
import CareManager from "./modules/care-manager"
import CareReceiver from "./modules/care-receiver"
import Common from "./modules/common"
import WeeklyServiceSchedule from "./modules/weekly-service-schedule"
import NursingCareOffice from "./modules/nursing-care-office"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    CareLevels,
    CareManager,
    CareReceiver,
    Common,
    WeeklyServiceSchedule,
    NursingCareOffice,
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
