<template>
  <div class="dashboard">
    <div class="page__header">
      <h2 class="page__ttl">ダッシュボード</h2>
    </div>
    <div class="page__content">
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
            <td>{{ day_of_weeks[schedule.dayofweek_id] }}</td>
            <td>{{ schedule.service_type.name }}</td>
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
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      weekly_service_schedules: null
    }
  },
  computed: {
    ...mapGetters([
      'emptyWeeklyServiceSchedules',
      'getWeeklyServiceSchedules',
    ]),
    ...mapGetters({
      care_receiver: 'getLoggedInCareReceiver',
      day_of_weeks: 'getDayOfWeeks'
    })
  },
  methods: {
    ...mapActions([
      'fetchWeeklyServiceSchedules',
    ]),
    async initialize() {
      if (this.emptyWeeklyServiceSchedules) {
        await this.fetchWeeklyServiceSchedules(this.care_receiver.id);
      }

      this.weekly_service_schedules = this.getWeeklyServiceSchedules;
    }
  },
  async created() {
    await this.initialize();
  }
};
</script>

<style scoped>
.dashboard {
  padding-bottom: 30px;
}
.page__header {
  justify-content: space-between;
}
.page__ttl {
  padding: 0;
  margin-right: 40px;
}

.weekly-service-schedule__tbl td {
  text-align: center;
  padding: 15px 10px;
}
</style>