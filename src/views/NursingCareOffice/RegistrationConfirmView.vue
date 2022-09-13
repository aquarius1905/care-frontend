<template>
  <div class="care-manager-registration-confirm">
    <div class="form confirm-form box-shadow">
      <h2 class="form-ttl">居宅介護事業所　登録内容確認</h2>
      <div class="confirm-content">
        <table class="confirm-tbl">
          <tr>
            <th>氏名</th>
            <td>{{ nursing_care_office.last_name }}&emsp;{{ nursing_care_office.first_name }}</td>
          </tr>
          <tr>
            <th>フリガナ</th>
            <td>{{ nursing_care_office.last_name_furigana }}&emsp;{{ nursing_care_office.first_name_furigana }}</td>
          </tr>
          <tr>
            <th>メールアドレス</th>
            <td>{{ nursing_care_office.email }}</td>
          </tr>
          <tr>
            <th>電話番号</th>
            <td>{{ nursing_care_office.tel }}</td>
          </tr>
          <tr>
            <th>パスワード</th>
            <td>************</td>
          </tr>
        </table>
        <div class="register-btn-wrap">
          <button class="bk-btn btn" @click="back">戻る</button>
          <button class="btn" @click="register">登録</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from "@/http-common";
export default {
  data: function () {
    return {
      nursing_care_office: null
    }
  },
  methods: {
    back() {
      this.$router.push({
        name: 'NursingCareOfficeRegistration',
        query: { nursing_care_office: this.nursing_care_office }
      });
    },
    async register() {
      if (confirm('登録しますか？')) {
        this.makeNursingCareOfficeData();

        try {
          const response = await api.post(
            '/home-care-service-provider/register',
            this.nursing_care_office
          );

          if (response.status === 201) {
            this.$router.push({
              name: 'CareManagerRegistrationCompletion'
            });
          }
        } catch (error) {
          alert('登録に失敗しました');
          console.log(error);
        }
      }
    },
    makeNursingCareOfficeData() {
      this.nursing_care_office['name']
        = this.nursing_care_office['last_name'] + '　' + this.nursing_care_office['first_name'];
      this.nursing_care_office['name_furigana']
        = this.nursing_care_office['last_name_furigana'] + '　' + this.nursing_care_office['first_name_furigana'];
      
      [
        'last_name',
        'first_name',
        'last_name_furigana',
        'first_name_furigana',
      ].forEach(e => delete this.nursing_care_office[e]);
    }
  },
  created() {
    this.nursing_care_office
      = this.$route.query.nursing_care_office;
  }
};
</script>

<style scoped>
.confirm-tbl th {
  width: 40%;
}
.bk-btn {
  width: 120px;
  background-color: #7E57C2;
  margin-right: 30px;
}
</style>
