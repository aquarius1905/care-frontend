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
            <th>生年月日</th>
            <td>{{ care_receiver.birthday }}</td>
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
            <th>被保険者番号</th>
            <td>{{ care_receiver.insured_number }}</td>
          </tr>
        </table>
        <fieldset class="confirm-fieldset">
          <legend class="legend">キーパーソン</legend>
          <table class="confirm-tbl">
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
            <tr>
              <th>パスワード</th>
              <td>************</td>
            </tr>
          </table>
        </fieldset>
        <div class="register-btn-wrap">
          <button class="back-btn btn" @click="back">戻る</button>
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
    back() {
      this.$router.push({
        name: 'CareReceiverRegistration',
        query: { care_receiver: this.care_receiver, key_person: this.key_person }
      });
    },
    register() {
      if (confirm('登録しますか？')) {
        this.registerCareReceiver();
      }
    },
    makeCareReceiverData() {
      let registration_data = this.care_receiver;
      registration_data.name
        = registration_data.last_name + '　' + registration_data.first_name;
      registration_data.name_furigana
        = registration_data.last_name_furigana + '　' + registration_data.first_name_furigana;
      registration_data.care_level_id = registration_data.care_level.id;

      [
        'last_name',
        'first_name',
        'last_name_furigana',
        'first_name_furigana',
        'care_level'
      ].forEach(e => delete registration_data[e]);

      return registration_data;
    },
    makeKeyPersonData(care_receiver_id) {
      let registration_data = this.key_person;
      registration_data.name
        = registration_data.last_name + '　' + registration_data.first_name;
      registration_data.name_furigana
        = registration_data.last_name_furigana + '　' + registration_data.first_name_furigana;
      registration_data.care_receiver_id = care_receiver_id;

      [
        'last_name',
        'first_name',
        'last_name_furigana',
        'first_name_furigana'
      ].forEach(e => delete registration_data[e]);

      return registration_data;
    },
    registerCareReceiver() {
      const care_receiver = this.makeCareReceiverData();
      axios
        .post(`${process.env.VUE_APP_API_ORIGIN}/care-receivers`,
          care_receiver,
          {
            headers: {
              Authorization: `Bearer ${this.$store.getters.getCareManagerAccessToken}`,
            }
          })
        .then(response => {
          if (response.status === 201) {
            this.registerKeyPerson(response.data.care_receiver_id);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    registerKeyPerson(care_receiver_id) {
      const key_person = this.makeKeyPersonData(care_receiver_id);
      axios
        .post(`${process.env.VUE_APP_API_ORIGIN}/key-persons`,
          key_person,
          {
            headers: {
              Authorization: `Bearer ${this.$store.getters.getCareManagerAccessToken}`,
            }
        })
        .then(response => {
          if (response.status === 201) {
            this.$router.push({
              name: 'CareManagerRegistrationComplete'
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.care_receiver = this.$route.query.care_receiver
    this.key_person = this.$route.query.key_person;
  }
};
</script>

<style scoped>
.confirm-tbl {
  table-layout: fixed;
  width: 100%;
}
.confirm-tbl th {
  text-align: left;
  height: 70px;
  width: 30%;
}
.confirm-tbl td {
  width: 90%;
}
.confirm-fieldset {
  border: 1px solid #555;
  padding: 20px 10px 0;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 20px;
}
.legend {
  font-weight: bold;
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
