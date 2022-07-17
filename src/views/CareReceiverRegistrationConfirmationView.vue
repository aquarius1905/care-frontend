<template>
  <div class="care-manager-registration-confirmation">
    <div class="form box-shadow">
      <h2 class="form-ttl">被介護者 登録確認</h2>
      <div class="confirm-content">
        <table class="confirm-tbl">
          <tr>
            <th>お名前</th>
            <td>{{ care_receiver.last_name }}&emsp;{{ care_receiver.first_name }}</td>
          </tr>
          <tr>
            <th>フリガナ</th>
            <td>{{ care_receiver.last_name_furigana }}&emsp;{{ care_receiver.first_name_furigana }}</td>
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
            <td>{{ care_receiver.care_level }}</td>
          </tr>
          <fieldset>
            <legend>キーパーソン</legend>
            <tr>
              <th>お名前</th>
              <td>{{ key_person.last_name }}&emsp;{{ key_person.first_name }}</td>
            </tr>
            <tr>
              <th>フリガナ</th>
              <td>{{ key_person.last_name_furigana }}&emsp;{{ key_person.first_name_furigana }}</td>
            </tr>
            <tr>
              <th>続柄</th>
              <td>{{ key_person.relationship }}</td>
            </tr>
            <tr>
              <th>メールアドレス</th>
              <td>{{ key_person.email }}</td>
            </tr>
            <tr>
              <th>電話番号</th>
              <td>{{ key_person.tel }}</td>
            </tr>
          </fieldset>
        </table>
        <div class="register-btn-wrap">
          <button class="back-btn btn" @click="$router.back()">戻る</button>
          <button class="btn" @click="register">登録</button>
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
      care_receiver: null,
      key_person: null
    }
  },
  methods: {
    register() {
      if (confirm('登録しますか？')) {
        this.makeCareReceiverData()
        axios
          .post(`${process.env.VUE_APP_API_ORIGIN}/care-managers`, this.care_receiver)
          .then(reseponse => {
            console.log(reseponse.message);
            this.$router.push({ name: 'CareManagerRegistrationComplete' });
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    makeCareReceiverData() {
      this.care_receiver['name']
        = this.care_receiver['last_name'] + '　' + this.care_receiver['first_name'];
      this.care_receiver['name_furigana']
        = this.care_receiver['last_name_furigana'] + '　' + this.care_receiver['first_name_furigana'];
      delete this.care_receiver['last_name'];
      delete this.care_receiver['first_name'];
      delete this.care_receiver['last_name_furigana'];
      delete this.care_receiver['first_name_furigana'];
    }
  },
  created() {
    this.care_receiver = this.$store.getters.getCareReceiver;
    console.log(this.care_receiver);
    this.key_person = this.$store.getters.getKeyPerson;
  }
};
</script>

<style scoped>
.care-manager-registration-confirmation {
  background-color: #eee;
}
.confirm-tbl {
  width: 100%;
}
.confirm-tbl th {
  text-align: left;
  height: 70px;
  width: 40%;
}
.register-btn-wrap {
  display: flex;
  justify-content: center;
  text-align: center;
}
.back-btn {
  width: 120px;
  background-color: #7E57C2;
  margin-right: 30px;
}
</style>
