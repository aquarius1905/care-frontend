<template>
  <div id="care-manager-info">
    <div class="form box-shadow">
      <h2 class="form-ttl">ケアマネージャー 情報</h2>
      <div class="form-content">
        <table class="info-tbl">
          <tr>
            <th>氏名</th>
            <td>{{ care_manager.name }}</td>
          </tr>
          <tr>
            <th>フリガナ</th>
            <td>{{ care_manager.name_furigana }}</td>
          </tr>
          <tr>
            <th>介護支援専門員登録番号</th>
            <td>{{ care_manager.registration_number }}</td>
          </tr>
          <tr>
            <th>所属居宅介護支援事業所</th>
            <td>{{ care_manager.home_care_support_office.name }}</td>
          </tr>
          <tr>
            <th>メールアドレス</th>
            <td>{{ care_manager.email }}</td>
          </tr>
          <tr>
            <th>電話番号</th>
            <td>{{ care_manager.tel }}</td>
          </tr>
          <tr>
            <th>パスワード</th>
            <td>************</td>
          </tr>
        </table>
      </div>
      <div class="form-btn-wrap">
        <button class="btn" @click="changeInfo">変更</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      care_manager: null
    }
  },
  methods: {
    changeInfo() {
    },
    getCareManagerInfo() {
      axios
        .get(`${process.env.VUE_APP_API_ORIGIN}/care-managers/me`,
          {
            headers: {
                Authorization: `Bearer ${this.$store.getters.getCareManagerAccessToken}`,
            }
        })
        .then(response => {
          if (response.data.result) {
            this.care_manager = response.data.care_manager;
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.getCareManagerInfo();
  }
}
</script>
<style>
.info-tbl {
  table-layout: fixed;
  width: 100%;
}
.info-tbl th {
  text-align: left;
  height: 70px;
  width: 40%;
  vertical-align: middle;
}
.info-tbl td {
  vertical-align: middle;
}
</style>