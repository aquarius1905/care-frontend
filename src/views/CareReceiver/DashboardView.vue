<template>
  <div class="dashboard">
    <div class="page__header">
      <h2 class="page__ttl">ダッシュボード</h2>
    </div>
    <div class="page__content">
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
          <tr v-for="(schedule, index) in weekly_service_schedules" :key="index">
            <td>{{ schedule.dayofweek.name }}</td>
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
import { careReceiverAuthApi } from "@/plugins/axios";
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      weekly_service_schedules: null
    }
  },
  computed: {
    ...mapGetters({
      care_receiver: 'getLoggedInCareReceiver',
    })
  },
  methods: {
    async initialize() {
      try {
        const params = {
          care_receiver_id: this.care_receiver.id
        }
        const { data } = await careReceiverAuthApi.get(
          '/weekly-service-schedules',
          { params }
        );
        this.weekly_service_schedules = data.data;
        console.log(this.weekly_service_schedules);
      } catch (error) {
        console.log(error);
        alert('週間サービス計画表のデータ取得に失敗しました');
      }
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

.weekly-service__tbl td {
  text-align: center;
  padding: 15px 10px;
}
</style>