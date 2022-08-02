<template>
  <div>
    <h2 class="ttl">担当被介護者一覧</h2>
    <table class="tbl box-shadow">
      <thead>
        <tr>
          <th>No</th>
          <th>氏名</th>
          <th>フリガナ</th>
          <th>生年月日</th>
          <th>介護度</th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(care_receiver, index) in care_receivers" :key="care_receiver.id">
          <td>{{ index + 1 }}</td>
          <td>{{ care_receiver.name }}</td>
          <td>{{ care_receiver.name_furigana }}</td>
          <td>{{ $dayjs(care_receiver.birthday).format('YYYY/MM/DD') }}</td>
          <td>{{ care_receiver.care_level.name }}</td>
          <td><button class="btn detail-btn" @click="showDetail(care_receiver)">詳細</button></td>
          <td><button class="btn detail-btn" @click="updateCareReceiver()">更新</button></td>
          <td><button class="btn detail-btn" @click="deleteCareReceiver(care_receiver.id)">削除</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      care_receivers: null
    }
  },
  methods: {
    async getCareReceivers() {
      const { data } = await axios.get(`${process.env.VUE_APP_API_ORIGIN}/care-receivers`, {
        headers: {
          Authorization: `Bearer ${this.$store.getters.getCareManagerAccessToken}`,
        }
      });
      this.care_receivers = data.data;
    },
    showDetail(care_receiver) {
      this.$router.push({
        name: 'CareReceiverDetail',
        query: { care_receiver: care_receiver }
      });
    },
    updateCareReceiver() {

    },
    async deleteCareReceiver(care_receiver_id) {
      if (confirm("削除しますか？")) {
        const response = await axios.delete(`${process.env.VUE_APP_API_ORIGIN}/care-receivers/` + care_receiver_id
        , {
          headers: {
            Authorization: `Bearer ${this.$store.getters.getCareManagerAccessToken}`,
          }
          });
        if (response.status === 200) {
          this.getCareReceivers();
        } else {
          alert("削除に失敗しました");
        }
      }
    }
  },
  created() {
    this.getCareReceivers();
  }
};
</script>

<style scoped>
.ttl {
  margin-bottom: 20px;
}
.tbl {
  width: 90%;
  margin: 0 auto;
  border-radius: 6px;
}
.tbl tr {
  background-color: #fff;
}
.tbl th,
.tbl td {
  text-align: center;
  padding: 10px 0;
}
.tbl th {
  font-size: 20px;
  color: #f5f5f5;
  background-color: #1A237E;
}
.tbl th:first-child {
  border-top-left-radius: 6px;
}
.tbl th:last-child {
  border-top-right-radius: 6px;
}
.tbl tr:last-child td {
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}
.tbl td {
  color: #555;
}
.detail-btn {
  width: auto;
  padding: 5px 10px;
}
</style>
