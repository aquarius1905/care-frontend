<template>
  <div class="monthly-schedule">
    <div class="page__header">
      <h2 class="page__ttl">月別スケジュール</h2>
    </div>
    <div class="page-content">
      <h3 class="page-content__ttl">{{ this_year_and_month }}</h3>
      <div class="page-content__inner">
        <table class="monthly-schedule__tbl box-shadow">
          <thead>
            <tr>
              <th rowspan="2">日付</th>
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
            <tr v-for="(schedule, index) in monthly_schedules" :key="index">
              <td>{{ schedule.date }}</td>
              <td></td>
              <td></td>
              <td></td>
              <td><button class="btn tbl-cancel__btn">キャンセル</button></td>
            </tr>
          </tbody>
        </table>
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
    async initialize() {
      this.setYearAndMonth();
      this.weekly_service_schedules = this.getWeeklyServiceSchedules;
      this.makeMonthlySchedules();
    },
    setYearAndMonth() {
      this.this_year_and_month
        = dayjs().format('YYYY年MM月');
    },
    makeMonthlySchedules() {
      const monthStart = dayjs().startOf('month');
      const monthEnd = dayjs().endOf('month');
      const numberOfDays = monthEnd.diff(monthStart, "day");
      for (let i = 0; i <= numberOfDays; i++) {
        const date = monthStart.add(i, 'd').format('D日（ddd）');
        this.monthly_schedules.push({ 'date': date });
      }
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
.page-content__ttl {
  margin-bottom: 20px;
}
.page-content__inner {
  display: flex;
  justify-content: space-between;
}
.monthly-schedule__tbl {
  width: 70%;
}
.monthly-schedule__tbl th,
.monthly-schedule__tbl td {
  text-align: left;
  padding: 10px;
  width: auto;
}
.cancel__form {
  margin-left: 30px;
  width: 450px;
}
.tbl-cancel__btn {
  width: 110px;
}
.cancel__btn {
  width: 120px;
}
</style>