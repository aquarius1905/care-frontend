<template>
  <div class="dashboard">
    <div class="dashboard__header">
      <button class="btn yesterday__btn" @click="yesterday"> &lt; 前日</button>
      <h2 class="page__ttl">{{ $dayjs().format('YYYY年MM月DD日（ddd）') }} 利用者一覧</h2>
      <button class="btn tomorrow__btn" @click="tomorrow">明日 &gt; </button>
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
          <tr v-for="(object, index) in users_list" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ object.care_receiver.name }}</td>
            <td>{{ object.care_receiver.name_furigana }}</td>
            <td>{{ object.care_receiver.email }}</td>
            <td>{{ object.care_receiver.tel }}</td>
            <td>{{ object.starting_time.substring(0, 5) }}</td>
            <td>{{ object.ending_time.substring(0, 5) }}</td>
            <td>
              <button class="btn contact-book__btn"
              @click="showDiary(object)">
                日誌
              </button>
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
      date: null,
      users_list: null
    }
  },
  methods: {
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
    },
    yesterday() {
      this.$router.push({
        name: 'NursingCareOfficeDashboard'
      });
    },
    tomorrow() {
      this.$router.push({
        name: 'NursingCareOfficeDashboard'
      });
    },
    showDiary(object) {
      const service_type_id = object.nursing_care_office.service_type_id;
      const send_data = {
        care_receiver_id: object.care_receiver_id,
        care_receiver_name: object.care_receiver.name
      };
      switch (service_type_id) {
        case 2:
          this.$router.push({
            name: 'DaycareDiaryInput',
            query: send_data
          });
          break;
      }

    }
  },
  async created() {
    await this.searchCareReceivers();
  } 
}
</script>

<style>
.dashboard__header{
  display: flex;
  align-items: center;
  padding: 20px;
}
.date {
  margin-left: 30px;
}
.dashboard__main {
  padding: 0 20px 20px;
}
.contact-book__btn {
  width: auto;
  padding: 5px 10px;
}
.yesterday__btn,
.tomorrow__btn {
  width: auto;
  padding: 5px 10px;
}
.yesterday__btn {
  margin-right: 20px;
}
.tomorrow__btn {
  margin-left: 20px;
}
</style>