<template>
  <div class="care-manager-registration-confirmation">
    <div class="form box-shadow">
      <h2 class="form-ttl">ケアマネージャー 登録確認</h2>
      <div class="confirm-content">
        <table class="confirm-tbl">
          <tr>
            <th>お名前</th>
            <td>{{ send_data.last_name }}&emsp;{{ send_data.first_name }}</td>
          </tr>
          <tr>
            <th>フリガナ</th>
            <td>{{ send_data.last_name_furigana }}&emsp;{{ send_data.first_name_furigana }}</td>
          </tr>
          <tr>
            <th>介護支援専門員登録番号</th>
            <td>{{ send_data.registration_number }}</td>
          </tr>
          <tr>
            <th>所属居宅介護支援事業所</th>
            <td>{{ send_data.support_office.name }}</td>
          </tr>
          <tr>
            <th>メールアドレス</th>
            <td>{{ send_data.email }}</td>
          </tr>
          <tr>
            <th>電話番号</th>
            <td>{{ send_data.tel }}</td>
          </tr>
          <tr>
            <th>パスワード</th>
            <td>************</td>
          </tr>
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
      send_data: null
    }
  },
  methods: {
    register() {
      if (confirm('登録しますか？')) {
        this.makeCareManagerData();
        axios
          .post(`${process.env.VUE_APP_API_ORIGIN}/care-managers`, this.send_data)
          .then(reseponse => {
            console.log(reseponse.message);
            this.$router.push({ name: 'CareManagerRegistrationComplete' });
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    makeCareManagerData() {
      this.send_data['support_office_id'] = this.send_data['support_office']['id'];
      this.send_data['name']
        = this.send_data['last_name'] + '　' + this.send_data['first_name'];
      this.send_data['name_furigana']
        = this.send_data['last_name_furigana'] + '　' + this.send_data['first_name_furigana'];
      delete this.send_data['last_name'];
      delete this.send_data['first_name'];
      delete this.send_data['last_name_furigana'];
      delete this.send_data['first_name_furigana'];
      delete this.send_data['support_office'];
    }
  },
  created() {
    this.send_data = this.$store.getters.getCareManager;
    console.log(this.send_data);
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
