<template>
  <div class="confirmation">
    <h2 class="confirmation__ttl">ケアマネージャー 登録内容確認</h2>
    <div class="confirmation__contentform box-shadow">
      <h3 class="confirmation__sub-ttl">事業所情報</h3>
      <table class="confirmation__tbl">
        <tr>
          <th>事業所名</th>
          <td>{{ care_manager.office_name }}</td>
        </tr>
        <tr>
          <th>法人名</th>
          <td>{{ care_manager.corporate_name }}</td>
        </tr>
        <tr>
          <th>事業所番号</th>
          <td>{{ care_manager.office_number }}</td>
        </tr>
        <tr>
          <th>郵便番号</th>
          <td>〒 {{ care_manager.office_postcode }}</td>
        </tr>
        <tr>
          <th>住所</th>
          <td>{{ care_manager.office_address }}</td>
        </tr>
      </table>
      <h3 class="confirmation__sub-ttl">ケアマネージャー情報</h3>
      <table class="confirmation__tbl">
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
        <tr>
          <th>パスワード</th>
          <td>************</td>
        </tr>
      </table>
      <div class="register-btn-wrap">
        <button class="bk__btn btn" @click="back">戻る</button>
        <button class="btn" @click="register">登録</button>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from "@/http-common";
import { mapGetters } from 'vuex'
export default {
  data: function () {
    return {
      care_manager: null
    }
  },
  computed: {
    ...mapGetters([ 'getCareManagerAccessToken' ])
  },
  methods: {
    back() {
      this.$router.push({
        name: 'CareManagerRegistration',
        query: { care_manager: this.care_manager }
      });
    },
    async register() {
      if (confirm('登録しますか？')) {
        this.makeCareManagerData();

        try {
          api.defaults.headers.common['Authorization']
            = 'Bearer ' + this.getCareManagerAccessToken;
          const response = await api.post(
            '/care-managers', this.care_manager
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
    makeCareManagerData() {
      this.care_manager['home_care_support_office_id']
        = this.care_manager['home_care_support_office']['id'];
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
