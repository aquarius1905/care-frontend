<template>
  <div class="monthly-schedule">
    <div class="ttl__wrap">
      <h2 class="page__ttl">月別スケジュール</h2>
      <label class="date">{{ this_year_and_month }}</label>
    </div>
    <div class="page-content">
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
          <tr v-for="(schedule, index) in monthly_schedules" :key="index" >
            <td>{{ schedule.date.format('D日（ddd）') }}</td>
            <td>{{ schedule.office_name }}</td>
            <td>{{ schedule.starting_time }}</td>
            <td>{{ schedule.ending_time }}</td>
            <td>
              <button class="btn tbl-cancel__btn" 
              :disabled="schedule.disabled"
              @click="cancel(schedule)">
                キャンセル
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      this_year_and_month: null,
      monthly_schedules: []
    }
  },
  computed: {
    ...mapGetters({
      care_receiver: 'getLoggedInCareReceiver',
      weekly_service_schedules: 'getWeeklyServiceSchedules'
    })
  },
  methods: {
    setYearAndMonth() {
      this.this_year_and_month
        = dayjs().format('YYYY年MM月');
    },
    makeMonthlySchedules() {
      const monthStart = dayjs().startOf('month');
      const monthEnd = dayjs().endOf('month');
      const numberOfDays = monthEnd.diff(monthStart, "day");
      for (let i = 0; i <= numberOfDays; i++) {
        let date = monthStart.add(i, 'd');
        const schedules = this.weekly_service_schedules.filter(
          item => item.dayofweek_id === date.day()
        );
        if (schedules.length === 0) {
          continue;
        }
        for (let schedule of schedules) {
          const monthly_schedule = {
            'date': date,
            'office_name': schedule.nursing_care_office.office_name,
            'starting_time': schedule.starting_time.substring(0, 5),
            'ending_time': schedule.ending_time.substring(0, 5),
            'disabled': date.isSameOrBefore(dayjs())
          }
          this.monthly_schedules.push(monthly_schedule);
        }
      }
    },
    cancel(schedule) {
      schedule.care_receiver_id = this.care_receiver.id;
      this.$router.push({
        name: 'Cancellation',
        query: { schedule: schedule }
      });
    }
  },
  created() {
    dayjs.extend(isSameOrBefore);
    this.setYearAndMonth();
    this.makeMonthlySchedules();
  }
}
</script>
<style scoped>
.monthly-schedule {
  padding-bottom: 30px;
  margin: 0 auto;
  width: 70%;
}
.monthly-schedule__tbl th,
.monthly-schedule__tbl td {
  padding: 10px;
  width: auto;
}
.tbl-cancel__btn {
  width: 110px;
}
</style>