<template>
  <div class="weekly-schedule">
    <div class="page__header">
      <h2 class="page__ttl">週間サービス計画表</h2>
      <p>{{ care_receiver_name }}&emsp;様</p>
    </div>
    <div class="page-content">
      <div class="service-registration__form box-shadow">
        <h3 class="form__ttl service-registration__form-ttl">サービス登録</h3>
        <div class="form__content">
          <validation-observer ref="obs" v-slot="{ invalid }">
            <div class="form__item">
              <validation-provider v-slot="{ errors }" rules="required">
                <label for="day_of_week" class="form__item-lbl">
                  曜日
                  <span class="required__lbl">必須</span>
                </label>
                <select id="day_of_week" class="select" v-model="weekly_service_schedule.dayofweek_id">
                  <option v-for="(day_of_week, index) in day_of_weeks" :key="index" :value="index">
                    {{ day_of_week }}
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
                <vue-timepicker name="starting_time" id="timepicker" v-model="weekly_service_schedule.starting_time" format="HH:mm"
                  minute-interval="10" hour-label="時" minute-label="分" advanced-keyboard manual-input hide-clear-button>
                </vue-timepicker>
                ～
                <vue-timepicker name="ending_time" id="timepicker" v-model="weekly_service_schedule.ending_time" format="HH:mm" minute-interval="10" hour-label="時" minute-label="分" advanced-keyboard manual-input hide-clear-button>
                </vue-timepicker>
                <div class="error">{{ errors[0] }}</div>
              </validation-provider>
            </div>
            <div class="form__item">
              <validation-provider v-slot="{ errors }" rules="required">
                <label for="service_type" class="form__item-lbl">
                  サービス種別
                  <span class="required__lbl">必須</span>
                </label>
                <select id="service_type" class="select" 
                v-model="selected_service_type_id"
                @change="changeServiceType">
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
                <select id="service_type" class="select" v-model="weekly_service_schedule.nursing_care_office_id" required>
                  <option v-for="nursing_care_office in nursing_care_offices"    :key="nursing_care_office.id"
                  :value="nursing_care_office.id">
                    {{ nursing_care_office.office_name }}
                  </option>
                </select>
                <div class="error">{{ errors[0] }}</div>
              </validation-provider>
            </div>
            <button class="btn registration__btn" @click="registerSchedule" :disabled="invalid">
              登録
            </button>
          </validation-observer>
        </div>
      </div>
      <div>
        <table class="weekly-service-schedule__tbl box-shadow">
          <thead>
            <tr>
              <th rowspan="2">曜日</th>
              <th rowspan="2">サービス名</th>
              <th rowspan="2">施設名</th>
              <th colspan="2">サービス提供時間</th>
              <th rowspan="2"></th>
            </tr>
            <tr>
              <th>開始</th>
              <th>終了</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(schedule, index) in weekly_service_schedules" :key="index">
              <td>{{ day_of_weeks[schedule.dayofweek_id] }}</td>
              <td>{{ schedule.nursing_care_office.service_type.name }}</td>
              <td>{{ schedule.nursing_care_office.office_name }}</td>
              <td>{{ schedule.starting_time.substring(0, 5) }}</td>
              <td>{{ schedule.ending_time.substring(0, 5) }}</td>
              <td>
              <button class="btn delete__btn" @click="deleteSchedule(schedule.id, index)">
                削除
              </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { careManagerAuthApi } from "@/plugins/axios";
import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue';
import { mapGetters, mapActions } from 'vuex';
export default {
  components: {
    'vue-timepicker': VueTimepicker,
  },
  data() {
    return {
      weekly_service_schedule: {
        care_receiver_id: 0,
        dayofweek_id: 0,
        service_type_id: 1,
        nursing_care_office_id: 0,
        starting_time: '09:00',
        ending_time: '18:00'
      },
      day_of_weeks: null,
      service_types: null,
      nursing_care_offices: null,
      weekly_service_schedules: null,
      selected_service_type_id: 1
    }
  },
  computed: {
    ...mapGetters([
      'emptyServiceTypesWithNursingCareOffices',
      'getDayOfWeeks',
      'getServiceTypesWithNursingCareOffices',
      'getSelectedCareReceiverId',
    ]),
    ...mapGetters({
      care_receiver_name: 'getSelectedCareReceiverName',
      weekly_service_schedules: 'getWeeklyServiceSchedules'
    })
  },
  methods: {
    ...mapActions([
      'fetchServiceTypesWithNursingCareOffices',
    ]),
    async initialize() {
      this.setCurrentCareReceiverId();
      await this.setDayofweeksAndServicetypes();
      this.changeServiceType();
    },
    async setDayofweeksAndServicetypes() {
      if (this.emptyServiceTypesWithNursingCareOffices) {
        await this.fetchServiceTypesWithNursingCareOffices();
      }

      this.day_of_weeks = this.getDayOfWeeks;
      this.service_types = this.getServiceTypesWithNursingCareOffices;
    },
    changeServiceType() {
      const selected_service = this.service_types.filter(
        service_type => service_type.id === this.selected_service_type_id
      );

      this.nursing_care_offices
        = selected_service[0].nursing_care_offices;

      if (this.nursing_care_offices.length > 0) {
        this.weekly_service_schedule.nursing_care_office_id
          = this.nursing_care_offices[0].id;
      }
    },
    setCurrentCareReceiverId() {
      this.weekly_service_schedule.care_receiver_id
        = this.getSelectedCareReceiverId;
    },
    async registerSchedule() {
      if (!confirm("登録しますか？")) {
        return;
      }

      try {
        const { data } = await careManagerAuthApi.post(
          '/weekly-service-schedules',
          this.weekly_service_schedule
        );

        this.weekly_service_schedules.push(data.data);
      } catch (error) {
        alert('登録に失敗しました');
        console.log(error);
      }
    },
    async deleteSchedule(id, index) {
      if (!confirm("削除しますか？")) {
        return;
      }

      try {
        const response = await careManagerAuthApi.delete(
          '/weekly-service-schedules/' + id
        );

        if (response.status === 200) {
          this.weekly_service_schedules.splice(index, 1);
        }
      } catch (error) {
        alert('削除に失敗しました');
        console.log(error);
      }
    },
  },
  async created() {
    await this.initialize();
  }
};
</script>
<style scoped>
.weekly-schedule {
  padding-bottom: 30px;
}
.page__header {
  display: flex;
  align-items: center;
  padding: 20px;
}
.page__ttl {
  padding: 0;
  margin-right: 40px;
}

.service-registration__form {
  width: 600px;
}
.delete__btn {
  width: 60px;
}

.vue__time-picker,
.vue__time-picker .dropdown .select-list,
.vue__time-picker .dropdown {
  width: 210px;
}
.vue__time-picker input.display-time {
  border: 1px solid #767676;
  padding: 5px;
  font-size: 16px;
  width: 210px;
  height: auto;
  border-radius: 6px;
}
.form__item >>> .vue__time-picker .dropdown ul li:not([disabled]).active,
.form__item >>> .vue__time-picker .dropdown ul li:not([disabled]).active:focus,
.form__item >>> .vue__time-picker .dropdown ul li:not([disabled]).active:hover {
  background: #1A237E;
}
</style>