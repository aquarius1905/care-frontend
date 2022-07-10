<template>
  <div>
    <div class="care-manager-login-form box-shadow">
      <h2 class="form-ttl">ケアマネージャー ログイン</h2>
      <ValidationObserver ref="obs" v-slot="ObserverProps">
        <div class="login-form-content">
          <div class="form-item">
            <label class="form-item-lbl" for="email">メールアドレス</label>
            <ValidationProvider v-slot="{ errors }" rules="required|email">
              <div class="form-item-input">
                <input type="email" id="email" class="input-form" v-model="login_data.email" placeholder="test@sample.com"
                  required>
              </div>
              <div class="error">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div class="form-item">
            <label class="form-item-lbl" for="password">パスワード</label>
            <ValidationProvider v-slot="{ errors }" rules="required|min:8|max:255">
              <div class="form-item-input">
                <input type="password" id="password" class="input-form" v-model="login_data.password" required>
              </div>
              <div class="error">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
        </div>
        <div class="form-btn-wrap">
          <button class="btn login-btn" @click="login(ObserverProps)">ログイン</button>
        </div>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      login_data: {
        email: null,
        password: null,
      }
    }
  },
  methods: {
    login(ObserverProps) {
      if (ObserverProps.invalid || !ObserverProps.validated) {
        alert('入力エラーがあります');
      } else {
        axios
          .post(`${process.env.VUE_APP_API_ORIGIN}/care-managers/login`, this.login_data)
          .then(response => {
            const access_token = response.data.access_token;
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
            this.$store.dispatch('login', access_token);
            this.$router.push({
              name: 'CareReceiverRegistration'
            });
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
}
</script>

<style scoped>
.login-form-content {
  padding: 30px 20px 20px;
}
.care-manager-login-form {
  background-color: #fff;
  max-width: 400px;
  margin: 0 auto;
  border-radius: 6px;
}
.input-form {
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 0 10px;
  height: 48px;
  width: 100%;
  background: #eee;
  font-size: 18px;
}
.login-btn {
  width: 120px;
}
</style>
