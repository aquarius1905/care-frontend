<template>
  <div>
    <h2 class="ttl">担当被介護者一覧</h2>
    <table class="tbl">
      <tr>
        <th>ID</th>
        <th>氏名</th>
        <th>フリガナ</th>
        <th>生年月日</th>
        <th>介護度</th>
        <th>詳細</th>
      </tr>
    </table>
  </div>
</template>

<script>
// import axios from "axios";
export default {
  data: function () {
    return {
      care_receiver_list: null
    }
  },
  methods: {
  },
  created() {
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
.tbl td {
  color: #555;
}
</style>
