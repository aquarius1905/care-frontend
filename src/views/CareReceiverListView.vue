<template>
  <div>
    <h2 class="ttl">担当被介護者一覧</h2>
    <table class="tbl box-shadow">
      <thead>
        <tr>
          <th>ID</th>
          <th>氏名</th>
          <th>フリガナ</th>
          <th>生年月日</th>
          <th>介護度</th>
          <th>詳細</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="care_receiver in care_receivers" :key="care_receiver.id">
          <td>{{ care_receiver.id }}</td>
          <td>{{ care_receiver.name }}</td>
          <td>{{ care_receiver.name_furigana }}</td>
          <td>{{ care_receiver.birthday }}</td>
          <td>{{ care_receiver.care_level.name }}</td>
          <td><button>詳細</button></td>
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
      console.log(this.care_receivers);
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
  color: #fff;
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
</style>
