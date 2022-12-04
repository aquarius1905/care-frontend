<template>
  <div class="dashboard">
    <div class="dashboard__header">
      <button class="btn yesterday__btn" @click="movePage(false)">&lt; 前日</button>
      <h2 class="page__ttl">{{ $dayjs(this.date).format('YYYY年MM月DD日（ddd）') }} 
        本日の利用者一覧
      </h2>
      <button class="btn tomorrow__btn" @click="movePage(true)">明日 &gt;</button>
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
              <button class="btn notify__btn" 
                @click="notifyPickupTime(user.care_receiver)">
                送迎時間通知
              </button>
            </td>
            <td>
              <button class="btn diary__btn"
              @click="showDiary(user)">
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
import { nursingCareOfficeAuthApi } from "@/plugins/axios"
import dayjs from 'dayjs'
export default {
  data() {
    return {
      date: null,
      users_list: null,
    }
  },
  methods: {
    async searchCareReceivers() {
      try {
        const params = {
          dayofweek: dayjs(this.date).day()
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
    async movePage(tomorrow_flg) {
      let date = new Date(this.date);
      if (tomorrow_flg) {
        date.setDate(date.getDate() + 1);
      } else {
        date.setDate(date.getDate() - 1);
      }
      this.date = date;
      await this.searchCareReceivers();
    },
    notifyPickupTime(care_receiver) {
      if (!confirm("送迎時間を通知しますか？")) {
        return;
      }
      try {
        const send_data = {
          care_receiver_id: care_receiver.id,
          tel: care_receiver.tel,
          email: care_receiver.email
        };
        const response = nursingCareOfficeAuthApi.post(
          '/pickuptime-notifications', send_data
        );

        if (response.status === 201) {
          alert("送迎時間を通知しました");
        }
      } catch (error) {
        console.log(error);
        alert("送迎時間の通知に失敗しました")
      }
    },
    showDiary(user) {
      const send_data = {
        weekly_service_schedule_id: user.id,
        care_receiver_name: user.care_receiver.name,
        date: new Date(this.date).toDateString()
      };
      const service_type_id = user.nursing_care_office.service_type_id;
      console.log(service_type_id);
      switch (service_type_id) {
        case 1:
          break;
        case 2:
          this.$router.push({
            name: 'DaycareDiaryRegister',
            query: send_data
          });
          break;
      }
    },
  },
  async created() {
    const today = new Date();
    this.date = today.toDateString();
    await this.searchCareReceivers();
  } 
}
</script>

<style scoped>
.dashboard__header{
  display: flex;
  align-items: center;
  padding: 20px;
}

.dashboard__main {
  padding: 0 20px 20px;
}

.notify__btn,
.diary__btn {
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