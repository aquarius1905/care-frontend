<template>
  <div>
    <div class="login-form box-shadow">
      <h2 class="form-ttl">ケアマネージャー ログイン</h2>
      <ValidationObserver ref="obs" v-slot="ObserverProps">
        <div class="login-form-content">
          <div class="form-item">
            <label class="form-item-lbl" for="email">メールアドレス</label>
            <ValidationProvider v-slot="{ errors }" rules="required|email">
              <div class="form-item-input">
                <input type="email" id="email" class="input" v-model="login_data.email" placeholder="test@sample.com"
                  required>
              </div>
              <div class="error">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div class="form-item">
            <label class="form-item-lbl" for="password">パスワード</label>
            <ValidationProvider v-slot="{ errors }" rules="required">
              <div class="form-item-input">
                <input type="password" id="password" class="input" v-model="login_data.password" required>
              </div>
              <div class="error">{{ errors[0] }}</div>
              <div class="error">{{ login_error }}</div>
            </ValidationProvider>
          </div>
        </div>
        <div class="form-btn-wrap">
          <button class="btn login-btn" :disabled="ObserverProps.invalid || !ObserverProps.validated"
            @click="login">ログイン</button>
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
      },
      login_error: null
    }
  },
  methods: {
    async login() {
      try {
        const { data } = await axios.post(
          `${process.env.VUE_APP_API_ORIGIN}/care-managers/login`,
          this.login_data
        );

        const login_data = { access_token: data.access_token, care_manager: data.care_manager };
        await this.$store.dispatch('loginCareManager', login_data);
        
        this.$router.push({ name: 'CareReceiverList' });
      } catch (error) {
        this.login_error = error.response.data.login_error;
      }
    },
  }
}
</script>