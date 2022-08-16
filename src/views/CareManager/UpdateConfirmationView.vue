<template>
  <div class="care-manager-update-confirmation">
    <div class="form confirm-form box-shadow">
      <h2 class="form-ttl">ケアマネージャー更新内容確認</h2>
      <div class="confirm-content">
        <table class="confirm-tbl">
          <tr>
            <th>氏名</th>
            <td>{{ care_manager.last_name }}&emsp;{{ care_manager.first_name }}</td>
          </tr>
          <tr>
            <th>フリガナ</th>
            <td>{{ care_manager.last_name_furigana }}&emsp;{{ care_manager.first_name_furigana }}</td>
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
        </table>
        <div class="register-btn-wrap">
          <button class="bk-btn btn" @click="back">戻る</button>
          <button class="btn" @click="update">更新</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      care_manager: null
    }
  },
  methods: {
    back() {
      this.$router.push({
        name: 'CareManagerUpdate',
        query: { care_manager: this.care_manager }
      });
    },
    update() {
      if (confirm('更新しますか？')) {
        this.makeCareManagerData();
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.getCareManagerAccessToken;
        axios
          .put(
            `${process.env.VUE_APP_API_ORIGIN}/care-managers/${this.care_manager.id}`, this.care_manager
          )
          .then(response => {
            if (response.status === 200) {
              axios.defaults.headers.common['Authorization'] = null;
              this.$store.dispatch('setCareManager', this.care_manager);
              this.$router.push({
                name: 'CareManagerUpdateComplete'
              });
            }
          })
          .catch(error => {
            console.log(error);
          })
      }
    },
    makeCareManagerData() {
      this.care_manager['home_care_support_office_id'] = this.care_manager['home_care_support_office']['id'];
      this.care_manager['name']
        = this.care_manager['last_name'] + '　' + this.care_manager['first_name'];
      this.care_manager['name_furigana']
        = this.care_manager['last_name_furigana'] + '　' + this.care_manager['first_name_furigana'];
    }
  },
  created() {
    this.care_manager = this.$route.query.care_manager;
  }
};
</script>

<style scoped>
.confirm-tbl th {
  width: 40%;
}
.register-btn-wrap {
  display: flex;
  justify-content: center;
  text-align: center;
}
.bk-btn {
  width: 120px;
  background-color: #7E57C2;
  margin-right: 30px;
}
</style>
