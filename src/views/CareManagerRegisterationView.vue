<template>
  <div class="care-manager-registration">
    <div class="care-manager-registration-form box-shadow">
      <h2 class="form-ttl">ケアマネージャー 登録</h2>
      <form action="">
        <div class="form-content">
          <div class="form-item">
            <label class="form-item-lbl">お名前</label>
            <ValidationProvider v-slot="{ errors }" rules="required|max:255">
              <div class="form-item-input">
                <label for="first_name" class="name_lbl">姓</label>
                <input type="text" id="first_name" class="input-form first-name-input" v-model="form.last_name" name="姓"
                  placeholder="山田">
              </div>
              <div class="error">{{ errors[0] }}</div>
            </ValidationProvider>
            <ValidationProvider v-slot="{ errors }" rules="required|max:255">
              <div class="form-item-input">
                <label for="last_name" class="name_lbl">名</label>
                <input type="text" id="last_name" class="input-form" v-model="form.first_name" name="名"
                  placeholder="太郎">
              </div>
              <div class="error">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div class="form-item">
            <label class="form-item-lbl">フリガナ</label>
            <ValidationProvider v-slot="{ errors }" rules="required|max:255">
              <div class="form-item-input">
                <label for="last_name_furigana" class="name_lbl">セイ</label>
                <input type="text" id="last_name_furigana" class="input-form first-name-input"
                  v-model="form.last_name_furigana" placeholder="ヤマダ" required>
              </div>
              <div class="error">{{ errors[0] }}</div>
            </ValidationProvider>
            <ValidationProvider v-slot="{ errors }" rules="required|max:255">
              <div class="form-item-input">
                <label for="first_name_furigana" class="name_lbl">メイ</label>
                <input type="text" id="first_name_furigana" class="input-form" v-model="form.first_name_furigana"
                  placeholder="タロウ" required>
              </div>
              <div class="error">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div class="form-item">
            <label class="form-item-lbl" for="registration_number">介護支援専門員登録番号</label>
            <ValidationProvider v-slot="{ errors }" rules="required|length:10">
              <div class="form-item-input">
                <input type="text" id="registration_number" class="input-form" v-model="form.registration_number"
                  placeholder="1300000000" required>
              </div>
              <div class="error">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div class="form-item">
            <label class="form-item-lbl" for="suport_office">所属居宅介護支援事業所</label>
            <ValidationProvider v-slot="{ errors }" rules="required">
              <div class="form-item-input">
                <select id="suport_office" class="select-form">
                  <option v-for="support_office in support_offices" v-bind:key="support_office.id"
                    v-bind:value="support_office.id">{{ support_office.name }}</option>
                </select>
              </div>
              <div class="error">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div class="form-item">
            <label class="form-item-lbl" for="email">メールアドレス</label>
            <ValidationProvider v-slot="{ errors }" rules="required|email">
              <div class="form-item-input">
                <input type="email" id="email" class="input-form" v-model="form.email"
                  placeholder="taro_yamada@sample.com" required>
              </div>
              <div class="error">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div class="form-item">
            <label class="form-item-lbl" for="tel">電話番号</label>
            <ValidationProvider v-slot="{ errors }" rules="required|betweeen:10,11">
              <div class="form-item-input">
                <input type="email" id="tel" class="input-form" v-model="form.tel" placeholder="09012345678" required>
              </div>
              <div class="error">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div class="form-item">
            <label class="form-item-lbl" for="password">パスワード</label>
            <ValidationProvider v-slot="{ errors }" rules="required|min:8">
              <div class="form-item-input">
                <input type="password" id="password" class="input-form" v-model="form.password" required>
              </div>
              <div class="error">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
        </div>
        <div class="form-btn-wrap">
          <button class="confirm-btn" @click="registerCareManager">登録内容確認</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      support_offices: null,
      form: {
        last_name: null,
        first_name: null,
        last_name_furigana: null,
        first_name_furigana: null,
        registration_number: null,
        email: null,
        tel: null,
        password: null
      }
    }
  },
  methods: {
    registerCareManager() {
    }
  },
  mounted() {
    axios
      .get(`${process.env.VUE_APP_API_ORIGIN}/home-care-support-offices`)
      .then(response => {
        this.support_offices = response.data.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
}
</script>
<style scoped>
.form-content {
  padding: 20px;
}
.care-manager-registration {
  background-color: #eee;
}
.care-manager-registration-form {
  background-color: #fff;
  max-width: 600px;
  margin: 0 auto;
  border-radius: 6px;
}
.form-item {
  margin-bottom: 30px;
}
.form-item:last-child {
  margin-bottom: 0;
}
.form-item-lbl {
  display: inline-block;
  font-weight: bold;
  margin-bottom: 10px;
}
.form-item-input {
  display: flex;
  align-items: center;
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
.form-btn-wrap {
  text-align: center;
  padding: 20px 0;
}
.confirm-btn {
  color: #fff;
  background-color: #4527A0;
  border: none;
  padding: 5px 0;
  width: 150px;
  font-size: 18px;
  border-radius: 6px;
  cursor: pointer;
}
</style>
