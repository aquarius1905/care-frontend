<template>
  <div class="monthly-schedule">
    <div class="page__header">
      <h2 class="page__ttl">月別スケジュール</h2>
    </div>
    <div class="page__content">
      <h3 class="page__content-ttl">{{ this_year_and_month }}</h3>
      <div class="flex">
        <div>
          <table class="monthly-schedule__tbl box-shadow">
            <thead>
              <tr>
                <th rowspan="2">日付</th>
                <th rowspan="2">施設名</th>
                <th colspan="2">サービス提供時間</th>
              </tr>
              <tr>
                <th>開始時間</th>
                <th>終了時間</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(schedule, index) in monthly_schedules" :key="index">
                <td>{{ schedule.dayofweek.name }}</td>
                <td>{{ schedule.service_type.name }}</td>
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
        <div class="cancel__form box-shadow">
          <h3 class="form__ttl cancel__form-ttl">キャンセル</h3>
          <div class="form__content">
            <div class="form__item">
              <label>日付</label>
              <label></label>
            </div>
            <div class="form__item">
              <label>施設名</label>
              <label></label>
            </div>
            <div class="form__item">
              <label>開始時間</label>
              <label></label>
            </div>
            <div class="form__item">
              <label>終了時間</label>
              <label></label>
            </div>
            <div class="form__item">
              <label for="reason">理由</label>
            </div>
            <validation-observer ref="obs" v-slot="{ invalid }">
              <button class="btn cancel__btn" :disabled="invalid">
                キャンセル
              </button>
            </validation-observer>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      this_year_and_month: null,
      weekly_service_schedules: null,
      monthly_schedules: [],
    }
  },
  computed: {
    ...mapGetters([
      'emptyWeeklyServiceSchedules',
      'getWeeklyServiceSchedules',
    ]),
    ...mapGetters({
      care_receiver: 'getLoggedInCareReceiver',
    })
  },
  methods: {
    ...mapActions([
      'fetchWeeklyServiceSchedules',
    ]),
    async initialize() {
      this.setYearAndMonth();
      await this.fetchWeeklyServiceSchedules();
      this.makeMonthlySchedules();
    },
    setYearAndMonth() {
      this.this_year_and_month
        = dayjs().format('YYYY年MM月');
    },
    async fetchWeeklyServiceSchedules() {
      if (this.emptyWeeklyServiceSchedules) {
        await this.fetchWeeklyServiceSchedules(this.care_receiver.id);
      }

      this.weekly_service_schedules = this.getWeeklyServiceSchedules;
    },
    makeMonthlySchedules() {
      
    }
  },
  async created() {
    await this.initialize();
  }
}
</script>
<style scoped>
.monthly-schedule {
  padding-bottom: 30px;
}
.page__ttl {
  padding: 0;
  margin-right: 40px;
}
.page__content-ttl {
  margin-bottom: 20px;
}
.monthly-schedule__tbl {
  width: 60%;
}
.cancel__btn {
  width: 120px;
}
</style>