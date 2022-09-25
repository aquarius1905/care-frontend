<template>
  <div>
    <div class="login__form box-shadow">
      <h2 class="form-ttl">{{ formTitle + ' ログイン' }}</h2>
      <validation-observer ref="obs" v-slot="ObserverProps">
        <div class="login__form-content">
          <div class="form-item">
            <label class="form-item-lbl" for="email">メールアドレス</label>
            <validation-provider v-slot="{ errors }" rules="required|email">
              <div class="form-item-input">
                <input type="email" id="email" class="input" v-model="login_data.email" placeholder="test@sample.com"
                  required>
              </div>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="form-item">
            <label class="form-item-lbl" for="password">パスワード</label>
            <validation-provider v-slot="{ errors }" rules="required">
              <div class="form-item-input">
                <input type="password" id="password" class="input" v-model="login_data.password" required>
              </div>
              <div class="error">{{ errors[0] }}</div>
              <div class="error">{{ login_error }}</div>
            </validation-provider>
          </div>
          <router-link :to="`${forgotPasswordLink}`">パスワードを忘れた方はこちら</router-link>
        </div>
        <div class="form-btn-wrap">
          <button class="btn login-btn" 
          :disabled="ObserverProps.invalid || !ObserverProps.validated"
          @click="login">ログイン</button>
        </div>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import { api } from "@/http-common";
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
      'isKeyPerson',
      'isNursingCareOffice'
    ])
  },
  methods: {
    ...mapActions([
      'setLoggedInCareManager',
      'setLoggedInKeyPerson',
      'setLoggedInNursingCareOffice'
    ]),
    async login() {
        if (this.isCareManager) {
          await this.loginCareManager();
        } else if (this.isKeyPerson) {
          await this.loginKeyPerson();
        } else if (this.isNursingCareOffice) {
          await this.loginNursingCareOffice();
        }
    },
    async loginCareManager() {;
      try {
        const response = await api.post(
          '/care-managers/login', this.login_data
        );
        console.log(response.status);
        if (response.status === 200) {
          const login_data = {
            access_token: response.data.access_token,
            care_manager: response.data.care_manager
          };
          this.setLoggedInCareManager(login_data);
          this.$router.push({ name: 'CareManagerDashboard' });
        }
      } catch (error) {
        console.log(error.response.status);
        this.showError(error.response.status);
      }
    },
    async loginKeyPerson() {
      try {
        const response = await api.post(
          '/key-persons/login', this.login_data
        );
        const login_data = {
          access_token: response.data.access_token,
          key_person: response.data.key_person
        };
          
        if (response.status === 200) {
          this.setLoggedInKeyPerson(login_data);
          this.$router.push({ name: 'KeyPersonDashboard' });
        }
      } catch (error) {
        this.showError(error.response.status);
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
        this.showError(error.response.status);
      }
    },
    showError(error_status) {
      switch (error_status) {
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

<style scoped>
.login__form {
  background-color: #fff;
  width: 500px;
  margin: 50px auto 0;
  border-radius: 6px;
}
.login__form-content {
  padding: 30px 20px 20px;
}
</style>