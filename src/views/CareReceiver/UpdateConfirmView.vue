<template>
  <div class="care-manager-registration-confirm">
    <div class="form box-shadow">
      <h2 class="form-ttl">被介護者・キーパーソン 更新確認</h2>
      <div class="confirm-content">
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
            <th>被保険者番号</th>
            <td>{{ care_receiver.insured_number }}</td>
          </tr>
        </table>
        <fieldset class="confirm-fieldset">
          <legend class="legend">キーパーソン</legend>
          <table class="confirmation__tbl">
            <tr>
              <th>氏名</th>
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
          </table>
        </fieldset>
        <div class="btn__wrap">
          <button class="bk__btn btn" @click="back">戻る</button>
          <button class="btn" @click="update">更新</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from 'vuex'
export default {
  data: function () {
    return {
      care_receiver: null,
      key_person: null,
    }
  },
  computed: {
    ...mapGetters([
      'getKeyPersonAccessToken',
      'getCareManagerAccessToken'
    ])
  },
  methods: {
    back() {
      this.$router.push({
        name: 'CareReceiverUpdate',
        query: {
          care_receiver: this.care_receiver,
          key_person: this.key_person
        }
      });
    },
    async update() {
      if (confirm('更新しますか？')) {
        await this.updateKeyPerson();
      }
    },
    makeCareReceiverData(key_person_id) {
      let registration_data = this.care_receiver;
      registration_data.name
        = registration_data.last_name + '　' + registration_data.first_name;
      registration_data.name_furigana
        = registration_data.last_name_furigana + '　' + registration_data.first_name_furigana;
      registration_data.care_level_id = registration_data.care_level.id;
      registration_data.key_person_id = key_person_id;

      [
        'last_name',
        'first_name',
        'last_name_furigana',
        'first_name_furigana',
        'care_level'
      ].forEach(e => delete registration_data[e]);

      return registration_data;
    },
    makeKeyPersonData() {
      let registration_data = this.key_person;
      registration_data.name
        = registration_data.last_name + '　' + registration_data.first_name;
      registration_data.name_furigana
        = registration_data.last_name_furigana + '　' + registration_data.first_name_furigana;

      [
        'last_name',
        'first_name',
        'last_name_furigana',
        'first_name_furigana'
      ].forEach(e => delete registration_data[e]);

      return registration_data;
    },
    async updateKeyPerson() {
      const key_person = this.makeKeyPersonData();

      keyPersonApi.defaults.headers.common['Authorization']
        = 'Bearer ' + this.getKeyPersonAccessToken;
      const response = await keyPersonApi.put(
        `/${this.key_person.id}`, key_person
      );
      if (response.status === 201) {
        await this.updateCareReceiver(response.data.key_person_id);
      } else {
          console.log(error);
      }
    },
    updateCareReceiver(key_person_id) {
      const care_receiver = this.makeCareReceiverData(key_person_id);
      axios
        .post(`${process.env.VUE_APP_API_ORIGIN}/care-receivers/${this.care_receiver.id}`,
          care_receiver,
          {
            headers: {
              Authorization: `Bearer ${this.getCareManagerAccessToken}`,
            }
          })
        .then(response => {
          if (response.status === 201) {
            this.$router.push({
              name: 'CareReceiverUpdateComplete'
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
  created() {
    this.care_receiver = this.$route.query.care_receiver
    this.key_person = this.$route.query.key_person;
  }
};
</script>

<style scoped>
.confirmation__tbl {
  table-layout: fixed;
}
.confirmation__tbl th {
  width: 30%;
}
.confirmation__tbl td {
  width: 90%;
}
.confirm-fieldset {
  border: 1px solid #555;
  padding: 20px 10px 0;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 20px;
}
</style>
