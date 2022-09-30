<template>
  <div id="weekly-schedule">
    <div class="page__header">
      <h2 class="page__ttl">週間サービス計画表</h2>
      <p>{{ care_receiver_name }}&emsp;様</p>
    </div>
    <div class="page__content">
      <div class="registration__form box-shadow">
        <validation-observer>
          <h3 class="form__ttl">サービス登録</h3>
          <div class="form__item">
            <validation-provider v-slot="{ errors }" rules="required">
              <label for="day_of_week" class="form__item-lbl">
                曜日
                <span class="required__lbl">必須</span>
              </label>
              <select id="day_of_week" class="select"
                v-model="weekly_service_schedule.day_of_week_id">
                <option v-for="day_of_week in day_of_weeks" :key="day_of_week.id" :value="day_of_week.id">
                  {{ day_of_week.name }}
                </option>
              </select>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="form__item">
            <validation-provider v-slot="{ errors }" rules="required">
              <label for="service_type" class="form__item-lbl">
                サービス名
                <span class="required__lbl">必須</span>
              </label>
              <select id="service_type" class="select"
                v-model="weekly_service_schedule.service_type_id">
                <option v-for="service_type in service_types" :key="service_type.id" :value="service_type.id">
                  {{ service_type.name }}
                </option>
              </select>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="form__item">
            <validation-provider v-slot="{ errors }" rules="required">
              <label for="service_type" class="form__item-lbl">
                施設名
                <span class="required__lbl">必須</span>
              </label>
              <select id="service_type" class="select"
                v-model="weekly_service_schedule.nursing_care_office_id">
                <option v-for="nursing_care_office in nursing_care_offices" :key="nursing_care_office.id" :value="nursing_care_office.id">
                  {{ sernursing_care_officevice_type.name }}
                </option>
              </select>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="form__item">
            <validation-provider v-slot="{ errors }" rules="required">
              <label class="form__item-lbl">
                サービス提供時間
                <span class="required__lbl">必須</span>
              </label>
              <vue-timepicker 
                name="starting_time" 
                id="timepicker" 
                v-model="weekly_service_schedule.starting_time" 
                format="HH:mm"
                minute-interval="10" hour-label="時" minute-label="分" hide-clear-button>
              </vue-timepicker>
              ～
              <vue-timepicker name="ending_time" id="timepicker" v-model="weekly_service_schedule.ending_time" format="HH:mm" minute-interval="10"
                hour-label="時" minute-label="分" hide-clear-button>
              </vue-timepicker>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
        </validation-observer>
        <button class="btn registration__btn" @click="register">登録</button>
      </div>
      <div>
        <table class="weekly-service__tbl box-shadow">
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
              </td>
              <td>
              </td>
              <td>
              </td>
              <td>
              </td>
              <td>
              </td>
              <td>
                <button class="btn delete__btn" @click="deleteRow(index)">
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
      weekly_service_schedule: {
        day_of_week_id: 1,
        service_type_id: 1,
        nursing_care_office_id: null,
        starting_time: {
          HH: '09',
          mm: '00'
        },
        ending_time: {
          HH: '18',
          mm: '00'
        },
      },
      day_of_weeks: null,
      service_types: null,
      nursing_care_offices: null,
    }
  },
  computed: {
    ...mapGetters([
      'getDayOfWeeks',
      'getServiceTypes'
    ]),
    ...mapGetters({
      care_receiver_name: 'getCurrentCareReceiverName'
    })
  },
  methods: {
    ...mapActions([
      'fetchDayofweeksAndServicetypes',
    ]),
    async setDayofweeksAndServicetypes() {
      await this.fetchDayofweeksAndServicetypes();

      this.day_of_weeks = this.getDayOfWeeks;
      this.service_types = this.getServiceTypes;
    },
    changeServiceType(e) {
      this.nursing_care_offices = this.service_types.filter(
        service_type => service_type.id == e.target.value
      );
      console.log(this.nursing_care_offices);
    },
    deleteRow(index) {
    },
    addRow() {
      
    }
  },
  async created() {
    await this.setDayofweeksAndServicetypes();
  }
};
</script>
<style scoped>
.page__header {
  display: flex;
  align-items: center;
  padding: 20px;
}
.page__ttl {
  padding: 0;
  margin-right: 40px;
}
.registration__form {
  background-color: #fff;
  width: 500px;
  margin: 0 auto;
  padding: 20px;
}
.weekly-service__tbl {
  border-collapse: collapse;
  border-radius: 6px;
  margin: 30px auto 0;
  width: 900px;
}
.weekly-service__tbl thead {
  background-color: #1A237E;
  color: #f5f5f5
}
.weekly-service__tbl tbody {
  background-color: #fff;
}
.weekly-service__tbl th {
  padding: 8px 0;
  vertical-align: middle;
}

.weekly-service__tbl tr:first-child th:first-child {
  border-top-left-radius: 6px;
}
.weekly-service__tbl tr:first-child th:last-child {
  border-top-right-radius: 6px;
}

.weekly-service__tbl tr:last-child td {
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}

.weekly-service__tbl td {
  padding: 5px 10px;
}

.delete__btn {
  width: 60px;
}

.vue__time-picker,
.vue__time-picker .dropdown .select-list,
.vue__time-picker .dropdown {
  width: 200px;
}
.vue__time-picker input.display-time {
  border: 1px solid #767676;
  padding: 5px;
  font-size: 16px;
  width: 200px;
  height: auto;
}
.vue__time-picker .dropdown ul li:not([disabled]).active,
.vue__time-picker .dropdown ul li:not([disabled]).active:focus,
.vue__time-picker .dropdown ul li:not([disabled]).active:hover {
  background: #1A237E;
}
.registration__btn {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto 0;
  border: none;
  width: 100px;
}
</style>