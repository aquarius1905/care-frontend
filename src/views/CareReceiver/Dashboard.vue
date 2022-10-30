<template>
  <div class="dashboard">
    <div class="visit-datetime__wrap">
      <h2 class="visit-datetime__ttl">次回ケアマネジャー訪問日時</h2>
      <label class="visit-datetime__lbl">{{ visit_datetime }}</label>
    </div>
    <div>
      <h2 class="weekly-schedule__ttl">週間スケジュール</h2>
      <table class="weekly-service-schedule__tbl box-shadow">
        <thead>
          <tr>
            <th rowspan="2">曜日</th>
            <th rowspan="2">サービス名</th>
            <th rowspan="2">施設名</th>
            <th colspan="2">サービス提供時間</th>
          </tr>
          <tr>
            <th>開始</th>
            <th>終了</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(schedule, index) in weekly_service_schedules" :key="index">
            <td>{{ day_of_weeks[schedule.dayofweek]}}</td>
            <td>{{ schedule.nursing_care_office.service_type.name }}</td>
            <td>{{ schedule.nursing_care_office.office_name }}</td>
            <td>{{ schedule.starting_time.substring(0, 5) }}</td>
            <td>{{ schedule.ending_time.substring(0, 5) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters({
      day_of_weeks: 'getDayOfWeeks',
      weekly_service_schedules: 'getWeeklyServiceSchedules',
      visit_datetime: 'getCareManagerVisitDateTime'
    })
  },
};
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.visit-datetime__wrap {
  margin-bottom: 20px;
}

.visit-datetime__ttl,
.weekly-schedule__ttl {
  text-align: left;
}

.weekly-schedule__ttl {
  margin-bottom: 10px;
}
.weekly-service-schedule__tbl {
  padding: 10px;
}

.weekly-service-schedule__tbl td {
  text-align: center;
  padding: 15px 10px;
}
</style>