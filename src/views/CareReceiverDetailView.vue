<template>
  <div>
    <h2 class="ttl">被介護者詳細</h2>
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
