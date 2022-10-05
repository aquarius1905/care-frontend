<template>
  <div>
    <div class="login__form box-shadow">
      <h2 class="login__form-ttl">{{ formTitle + ' ログイン' }}</h2>
      <validation-observer v-slot="{ invalid }">
        <div class="login__form-content">
          <div class="form__item">
            <label class="form__item-lbl" for="email">メールアドレス</label>
            <validation-provider v-slot="{ errors }" rules="required|email">
              <div class="form__item-input">
                <input type="email" id="email" class="input" v-model="login_data.email" placeholder="test@sample.com"
                  required>
              </div>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="form__item">
            <label class="form__item-lbl" for="password">パスワード</label>
            <validation-provider v-slot="{ errors }" rules="required">
              <div class="form__item-input">
                <input type="password" id="password" class="input" v-model="login_data.password" required>
              </div>
              <div class="error">{{ errors[0] }}</div>
              <div class="error">{{ login_error }}</div>
            </validation-provider>
          </div>
          <router-link :to="`${forgotPasswordLink}`">パスワードを忘れた方はこちら</router-link>
        </div>
        <div class="form-btn-wrap">
          <button class="btn login-btn" :disabled="invalid" @click="login">
            ログイン
          </button>
        </div>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import { api } from "@/plugins/axios";
import { mapGetters, mapActions } from 'vuex'
export default {
  props: {
    formTitle: {
      type: String
    },
    forgotPasswordLink: {
      type: String
    }
  },
  data() {
    return {
      login_data: {
        email: null,
        password: null,
      },
      login_error: null
    }
  },
  computed: {
    ...mapGetters([
      'isCareManager',
      'isCareReceiver',
      'isNursingCareOffice'
    ])
  },
  methods: {
    ...mapActions([
      'setCareManagerAccessToken',
      'setLoggedInCareReceiver',
      'setLoggedInNursingCareOffice'
    ]),
    async login() {
        if (this.isCareManager) {
          await this.loginCareManager();
        } else if (this.isCareReceiver) {
          await this.loginCareReceiver();
        } else if (this.isNursingCareOffice) {
          await this.loginNursingCareOffice();
        }
    },
    async loginCareManager() {;
      try {
        const response = await api.post(
          '/care-managers/login', this.login_data
        );
        
        if (response.status === 200) {
          this.setCareManagerAccessToken(
            response.data.access_token
          );
          this.$router.push({ name: 'CareManagerDashboard' });
        }
      } catch (error) {
        this.showError(error);
      }
    },
    async loginCareReceiver() {
      try {
        const response = await api.post(
          '/care-receivers/login', this.login_data
        );
        const login_data = {
          access_token: response.data.access_token,
          care_receiver: response.data.care_receiver
        };
          
        if (response.status === 200) {
          this.setLoggedInCareReceiver(login_data);
          this.$router.push({ name: 'CareReceiverDashboard' });
        }
      } catch (error) {
        this.showError(error);
      }
    },
    async loginNursingCareOffice() {
      try {
        const response = await api.post(
          '/nursing-care-offices/login', this.login_data
        );
        const login_data = {
          access_token: response.data.access_token,
          nursing_care_office: response.data.nursing_care_office
        };
        
        if (response.status === 200) {
          this.setLoggedInNursingCareOffice(login_data);
          this.$router.push({ name: 'NursingCareOfficeDashboard' });
        }
      } catch (error) {
        this.showError(error);
      }
    },
    showError(error) {
      console.log(error);
      switch (error.response.status) {
        case 401:
          this.login_error = error.response.data.login_error;
          break;
        case 403:
          this.$router.push({ name: 'EmailUnverified' });
          break;
      }
    }
  }
}
</script>