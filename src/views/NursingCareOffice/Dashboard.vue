<template>
  <div class="dashboard">
    <div class="dashboard__header">
      <h2 class="page__ttl">本日の利用者一覧</h2>
      <h3 class="date">{{ today }}</h3>
    </div>
    <div class="dashboard__main">
      <table class="users-list__tbl box-shadow">
        <thead>
          <tr>
            <th rowspan="2">No</th>
            <th rowspan="2">利用者名</th>
            <th rowspan="2">フリガナ</th>
            <th rowspan="2">メール</th>
            <th rowspan="2">電話番号</th>
            <th colspan="2">サービス提供時間</th>
            <th rowspan="2"></th>
            <th rowspan="2"></th>
          </tr>
          <tr>
            <th>開始</th>
            <th>終了</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users_list" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ user.care_receiver.name }}</td>
            <td>{{ user.care_receiver.name_furigana }}</td>
            <td>{{ user.care_receiver.email }}</td>
            <td>{{ user.care_receiver.tel }}</td>
            <td>{{ user.starting_time.substring(0, 5) }}</td>
            <td>{{ user.ending_time.substring(0, 5) }}</td>
            <td>
              <button class="btn diary__btn" @click="showDiary(user)">日誌</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { nursingCareOfficeAuthApi } from "@/plugins/axios";
import dayjs from 'dayjs';
export default {
  data() {
    return {
      today: null,
      users_list: null
    }
  },
  methods: {
    async intialize() {
      this.setToday();
      await this.searchCareReceivers();
    },
    setToday() {
      this.today = dayjs().format('YYYY年MM月DD日（ddd）');
    },
    async searchCareReceivers() {
      try {
        const params = {
          dayofweek: dayjs().day()
        };
        const { data } = await nursingCareOfficeAuthApi.get(
          '/weekly-service-schedules/search',
          { params }
        );

        this.users_list = data.data;
      } catch (error) {
        console.log(error);
        alert("利用者一覧の取得に失敗しました")
      }
    },
    showDiary() {
      this.$router.push({
        name: 'Cancellation',
        query: { schedule: schedule }
      });
    }
  },
  async created() {
    this.intialize();
  } 
}
</script>

<style>
.dashboard__header{
  display: flex;
  align-items: center;
}
.date {
  margin-left: 30px;
}
.dashboard__main {
  padding: 0 20px 20px;
}
.diary__btn {
  width: 60px;
}
</style>