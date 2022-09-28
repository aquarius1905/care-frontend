<template>
  <div class="confirmation">
    <h2 class="confirmation__ttl">被介護者 登録内容確認</h2>
    <div class="confirmation__content box-shadow">
      <h3 class="confirmation__sub-ttl">被介護者情報</h3>
      <table class="confirmation__tbl">
        <tr>
          <th>氏名</th>
          <td>{{ care_receiver.last_name }}&emsp;{{ care_receiver.first_name }}</td>
        </tr>
        <tr>
          <th>フリガナ</th>
          <td>{{ care_receiver.last_name_furigana }}&emsp;{{ care_receiver.first_name_furigana }}</td>
        </tr>
        <tr>
          <th>性別</th>
          <td>{{ care_receiver.gender === 1 ? "男" : "女" }}</td>
        </tr>
        <tr>
          <th>生年月日</th>
          <td>{{ $dayjs(care_receiver.birthday).format('YYYY/MM/DD') }}</td>
        </tr>
        <tr>
          <th>郵便番号</th>
          <td>{{ care_receiver.post_code }}</td>
        </tr>
        <tr>
          <th>住所</th>
          <td>{{ care_receiver.address }}</td>
        </tr>
        <tr>
          <th>介護度</th>
          <td>{{ care_receiver.care_level.name }}</td>
        </tr>
        <tr>
          <th>保険者番号</th>
          <td>{{ care_receiver.insurer_number }}</td>
        </tr>
        <tr>
          <th>介護保険 被保険者番号</th>
          <td>{{ care_receiver.insured_number }}</td>
        </tr>
      </table>
      <h3 class="confirmation__sub-ttl">キーパーソン情報</h3>
      <table class="confirmation__tbl">
        <tr>
          <th>氏名</th>
          <td>{{ care_receiver.keyperson_lastname }}&emsp;{{ care_receiver.keyperson_firstname }}</td>
        </tr>
        <tr>
          <th>フリガナ</th>
          <td>{{ care_receiver.keyperson_lastname_furigana }}&emsp;{{ care_receiver.keyperson_firstname_furigana }}</td>
        </tr>
        <tr>
          <th>続柄</th>
          <td>{{ care_receiver.relationship }}</td>
        </tr>
        <tr>
          <th>メールアドレス</th>
          <td>{{ care_receiver.email }}</td>
        </tr>
        <tr>
          <th>電話番号</th>
          <td>{{ care_receiver.tel }}</td>
        </tr>
        <tr>
          <th>パスワード</th>
          <td>************</td>
        </tr>
      </table>
    </div>
    <div class="btn__wrap">
      <button class="bk__btn btn" @click="back">戻る</button>
      <button class="btn" @click="register">登録</button>
    </div>
  </div>
</template>

<script>
import { api } from "@/http-common";
import { mapGetters } from 'vuex'
export default {
  data: function () {
    return {
      care_receiver: null,
    }
  },
  computed: {
    ...mapGetters([ 'getCareManagerAccessToken' ])
  },
  methods: {
    back() {
      this.$router.push({
        name: 'CareReceiverRegistration',
        query: {
          care_receiver: this.care_receiver
        }
      });
    },
    async register() {
      if (confirm('登録しますか？')) {
        this.makeCareReceiverData();
        try {
          api.defaults.headers.common['Authorization']
            = 'Bearer ' + this.getCareManagerAccessToken;
          const response = await api.post(
            '/care-receivers', this.care_receiver
          );

          if (response.status === 201) {
            this.$router.push({
              name: 'CareReceiverRegistrationCompletion'
            });
          }
        } catch (error) {
          console.log(error);
          alert('登録に失敗しました');
        }
      }
    },
    makeCareReceiverData() {
      this.care_receiver.name
        = this.care_receiver.last_name + '　' + this.care_receiver.first_name;
      this.care_receiver.name_furigana
        = this.care_receiver.last_name_furigana + '　' + this.care_receiver.first_name_furigana;
      this.care_receiver.care_level_id = this.care_receiver.care_level.id;
      this.care_receiver.keyperson_name
        = this.care_receiver.keyperson_lastname + '　' + this.care_receiver.keyperson_firstname;
      this.care_receiver.keyperson_name_furigana
        = this.care_receiver.keyperson_lastname_furigana + '　' + this.care_receiver.keyperson_firstname_furigana;
    },
  },
  created() {
    this.care_receiver = this.$route.query.care_receiver
  }
};
</script>

<style scoped>
.confirmation__tbl th {
  width: 35%;
}
.confirmation__tbl td {
  width: 65%;
}
</style>
