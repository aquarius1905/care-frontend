<template>
  <div>
    <div class="form box-shadow">
      <h2 class="form-ttl">ケアマネージャー 登録</h2>
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
            <label class="form-item-lbl" for="registration_number">介護支援専門員登録番号</label>
            <ValidationProvider v-slot="{ errors }" rules="required|length:8">
              <div class="form-item-input">
                <input type="text" id="registration_number" class="input-form" v-model="send_data.registration_number"
                  placeholder="13000000" required>
              </div>
              <div class="error">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div class="form-item">
            <label class="form-item-lbl" for="suport_office">所属居宅介護支援事業所</label>
            <ValidationProvider v-slot="{ errors }" rules="required">
              <div class="form-item-input">
                <select id="suport_office" class="select-form" v-model="send_data.support_office">
                  <option v-for="support_office in support_offices" :key="support_office.id" :value="support_office">
                    {{ support_office.name }}
                  </option>
                </select>
              </div>
              <div class="error">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div class="form-item">
            <label class="form-item-lbl" for="email">メールアドレス</label>
            <ValidationProvider v-slot="{ errors }" rules="required|email">
              <div class="form-item-input">
                <input type="email" id="email" class="input-form" v-model="send_data.email"
                  placeholder="taro_yamada@sample.com" required>
              </div>
              <div class="error">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div class="form-item">
            <label class="form-item-lbl" for="tel">電話番号</label>
            <ValidationProvider v-slot="{ errors }" rules="required|min:10|max:11">
              <div class="form-item-input">
                <input type="text" id="tel" class="input-form" v-model="send_data.tel" placeholder="09012345678"
                  required>
              </div>
              <div class="error">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div class="form-item">
            <label class="form-item-lbl" for="password">パスワード</label>
            <ValidationProvider v-slot="{ errors }" rules="required|min:8">
              <div class="form-item-input">
                <input type="password" id="password" class="input-form" v-model="send_data.password" required>
              </div>
              <div class="error">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
        </div>
        <div class="form-btn-wrap">
          <button class="btn"
            @click="confirmRegistration(ObserverProps)">登録内容確認</button>
        </div>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ['senddata'],
  data() {
    return {
      support_offices: null,
      send_data: this.senddata
    }
  },
  methods: {
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
</style>
