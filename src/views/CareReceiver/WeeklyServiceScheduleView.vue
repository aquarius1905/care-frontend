<template>
  <div id="weekly-schedule">
    <div class="page-header">
      <h2 class="page-ttl">週間サービス計画表</h2>
      <p>{{ care_receiver_name }}&emsp;様</p>
    </div>
    <div class="page-content">
      <div>
        <table class="weekly-service-tbl box-shadow">
          <thead>
            <tr>
              <th rowspan="2">曜日</th>
              <th rowspan="2">サービス名</th>
              <th rowspan="2">施設名</th>
              <th colspan="2">サービス提供時間</th>
              <th rowspan="2"></th>
            </tr>
            <tr>
              <th>開始時間</th>
              <th>終了時間</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(schedule, index) in schedules" :key="index">
              <td>
                <select class="tbl-select">
                  <option v-for="day_of_week in day_of_weeks" :key="day_of_week.id" :value="day_of_week">
                    {{ day_of_week.name }}
                  </option>
                </select>
              </td>
              <td>
                <select class="tbl-select">
                  <option v-for="home_care_service in home_care_services" :key="home_care_service.id" :value="home_care_service">
                    {{ home_care_service.name }}
                  </option>
                </select>
              </td>
              <td>
                <input type="text" class="tbl-text" v-model="schedule.care_home_name">
              </td>
              <td>
                <vue-timepicker 
                name="starting_time"
                id="timepicker"
                v-model="schedule.starting_time"
                format="HH:mm"
                minute-interval="10"
                hour-label="時"
                minute-label="分"
                hide-clear-button>
                </vue-timepicker>
              </td>
              <td>
                <vue-timepicker 
                name="ending_time"
                id="timepicker"
                v-model="schedule.ending_time"
                format="HH:mm"
                minute-interval="10"
                hour-label="時"
                minute-label="分"
                hide-clear-button>
                </vue-timepicker>
              </td>
              <td>
                <button class="btn delete-btn" @click="deleteRow(index)">
                  削除
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <detail-menu class="detail-menu"></detail-menu>
    </div>
  </div>
</template>

<script>
import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue'
import { mapGetters, mapActions } from 'vuex'
import DetailMenu from "@/components/DetailMenu";
export default {
  components: {
    'detail-menu': DetailMenu,
    'vue-timepicker': VueTimepicker,
  },
  data() {
    return {
      day_of_weeks: null,
      home_care_services: null,
      schedules: [
        { day_of_week: "月曜日",
          service_type: "",
          care_home_name: "",
          starting_time :{
            HH: '09',
            mm: '00'
          },
          ending_time :{
            HH: '18',
            mm: '00'
          },
        }
      ],
      

    }
  },
  computed: {
    ...mapGetters([
      'emptyDayOfWeeks',
      'getDayOfWeeks',
      'emptyServiceTypes',
      'getServiceTypes'
    ]),
    ...mapGetters({
      care_receiver_name: 'getCurrentCareReceiverName'
    })
  },
  methods: {
    ...mapActions([
      'fetchDayOfWeeks',
      'fetchServiceTypes'
    ]),
    async setDayOfWeeks() {
      if (this.emptyDayOfWeeks) {
        await this.fetchDayOfWeeks();
      }

      this.day_of_weeks = this.getDayOfWeeks;
    },
    async setCareServiceTypes() {
      if (this.emptyServiceTypes) {
        await this.fetchServiceTypes();
      }

      this.home_care_services = this.getServiceTypes;
    },
    deleteRow(index) {

    }
  },
  async created() {
    await this.setDayOfWeeks();
    await this.setCareServiceTypes();
  }
};
</script>
<style scoped>
.page-content {
  display: flex;
  justify-content: center;
}
.page-header {
  display: flex;
  align-items: center;
  padding: 20px;
}
.page-ttl {
  padding: 0;
  margin-right: 40px;
}
.weekly-service-tbl {
  border-collapse: collapse;
}
.weekly-service-tbl thead {
  background-color: #1A237E;
  color: #f5f5f5
}
.weekly-service-tbl tbody {
  background-color: #fff;
}
.weekly-service-tbl th {
  padding: 8px 0;
  vertical-align: middle;
}

.weekly-service-tbl td {
  padding: 5px 10px;
}
.tbl-select,
.tbl-text {
  font-size: 16px;
  padding: 5px;
}

.delete-btn {
  width: 60px;
}

td >>> .vue__time-picker,
td >>> .vue__time-picker .dropdown .select-list,
td >>> .vue__time-picker .dropdown {
  width: 140px;
}
td >>> .vue__time-picker input.display-time {
  border: 1px solid #767676;
  padding: 5px;
  font-size: 16px;
  width: 140px;
  height: auto;
}
td >>> .vue__time-picker .dropdown ul li:not([disabled]).active,
td >>>.vue__time-picker .dropdown ul li:not([disabled]).active:focus,
td >>>.vue__time-picker .dropdown ul li:not([disabled]).active:hover {
  background: #1A237E;
}
</style>