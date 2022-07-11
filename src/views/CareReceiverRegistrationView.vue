<template>
  <div>
    <div class="form box-shadow">
      <h2 class="form-ttl">被介護者 登録</h2>
      <ValidationObserver ref="obs" v-slot="ObserverProps">
        <div class="form-content">
          <div class="form-item">
            <label class="form-item-lbl">お名前</label>
            <ValidationProvider v-slot="{ errors }" rules="required|max:127">
              <div class="form-item-input">
                <label for="last_name" class="name_lbl">姓</label>
                <input type="text" id="last_name" class="input-form first-name-input" v-model="send_data.last_name"
                  name="姓" placeholder="山田">
              </div>
              <div class="error">{{ errors[0] }}</div>
            </ValidationProvider>
            <ValidationProvider v-slot="{ errors }" rules="required|max:127">
              <div class="form-item-input">
                <label for="first_name" class="name_lbl">名</label>
                <input type="text" id="first_name" class="input-form" v-model="send_data.first_name" name="名"
                  placeholder="太郎">
              </div>
              <div class="error">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div class="form-item">
            <label class="form-item-lbl">フリガナ</label>
            <ValidationProvider v-slot="{ errors }" rules="required|max:127">
              <div class="form-item-input">
                <label for="last_name_furigana" class="name_lbl">セイ</label>
                <input type="text" id="last_name_furigana" class="input-form first-name-input"
                  v-model="send_data.last_name_furigana" placeholder="ヤマダ" required>
              </div>
              <div class="error">{{ errors[0] }}</div>
            </ValidationProvider>
            <ValidationProvider v-slot="{ errors }" rules="required|max:127">
              <div class="form-item-input">
                <label for="first_name_furigana" class="name_lbl">メイ</label>
                <input type="text" id="first_name_furigana" class="input-form" v-model="send_data.first_name_furigana"
                  placeholder="タロウ" required>
              </div>
              <div class="error">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div class="form-item">
            <label class="form-item-lbl" for="post_code">郵便番号</label>
            <ValidationProvider v-slot="{ errors }" rules="required|length:7">
              <div class="form-item-input">
                <input type="text" id="post_code" class="input-form" v-model="send_data.post_code" placeholder="1050004"
                  required>
                <button class="search-btn btn" @click="searchAddress">住所検索</button>
              </div>
              <div class="error">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div class="form-item">
            <label class="form-item-lbl" for="address">住所</label>
            <ValidationProvider v-slot="{ errors }" rules="required|max:255">
              <div class="form-item-input">
                <input type="text" id="address" class="input-form" v-model="send_data.address"
                  placeholder="東京都港区新橋5-6-7" required>
              </div>
              <div class="error">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div class="form-item">
            <fieldset class="fieldset">
              <legend class="form-item-lbl">介護度</legend>
              <div class="care_level_wrap">
                <div class="form-radio-item">
                  <label><input type="radio" name="care_level" v-model="send_data.care_level" value="0">要支援1</label>
                </div>
                <div class="form-radio-item">
                  <label><input type="radio" name="care_level" v-model="send_data.care_level" value="1">要支援2</label>
                </div>
              </div>
              <div class="care_level_wrap">
                <div class="form-radio-item">
                  <label><input type="radio" name="care_level" v-model="send_data.care_level" value="2">要介護1</label>
                </div>
                <div class="form-radio-item">
                  <label><input type="radio" name="care_level" v-model="send_data.care_level" value="3">要介護2</label>
                </div>
                <div class="form-radio-item">
                  <label><input type="radio" name="care_level" v-model="send_data.care_level" value="4">要介護3</label>
                </div>
                <div class="form-radio-item">
                  <label><input type="radio" name="care_level" v-model="send_data.care_level" value="5">要介護4</label>
                </div>
                <div class="form-radio-item">
                  <label><input type="radio" name="care_level" v-model="send_data.care_level" value="6">要介護5</label>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
        <div class="form-btn-wrap">
          <button class="btn" @click="confirmRegistration(ObserverProps)">登録内容確認</button>
        </div>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const jsonpAdapter = require('axios-jsonp')
export default {
  props: ['senddata'],
  data() {
    return {
      support_offices: null,
      send_data: this.senddata
    }
  },
  methods: {
    searchAddress() {
      axios
        .get(`https://api.zipaddress.net/?zipcode=${this.send_data.post_code}`, { adapter: jsonpAdapter })
        .then(response => {
          this.send_data.address = response.data.fullAddress;
      })
    },
    confirmRegistration(ObserverProps) {
      console.log(ObserverProps);
      if (ObserverProps.invalid || !ObserverProps.validated) {
        alert('入力エラーがあります');
      } else {
        this.$router.push({
          name: 'CareManagerRegistrationConfirmation'
        });
      }
    }
  },
  mounted() {
    axios
      .get(`${process.env.VUE_APP_API_ORIGIN}/home-care-support-offices`)
      .then(response => {
        this.support_offices = response.data.data;
        if (this.send_data.support_office === null) {
          this.send_data.support_office = this.support_offices[0];
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
}
</script>
<style scoped>
.care-manager-registration {
  background-color: #eee;
}
.first-name-input {
  margin-bottom: 10px;
}
.input-form {
  border: 1px solid #777;
  border-radius: 6px;
  padding: 0 10px;
  height: 48px;
  width: 100%;
  font-size: 18px;
}
.name_lbl {
  width: 100px;
}
.select-form {
  border: 1px solid #777;
  border-radius: 6px;
  padding: 0 10px;
  font-size: 18px;
  height: 40px;
  width: 100%;
}
.search-btn {
  width: 120px;
  margin-left: 10px;
}
.care_level_wrap {
  display: flex;
  margin-bottom: 20px
}
.form-radio-item {
  margin-right: 20px;
}
.fieldset {
  border: 1px solid #555;
  padding: 10px;
}
</style>
