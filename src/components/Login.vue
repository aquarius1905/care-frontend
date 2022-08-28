<template>
  <div>
    <div class="login-form box-shadow">
      <h2 class="form-ttl">{{ formTitle + ' ログイン' }}</h2>
      <ValidationObserver ref="obs" v-slot="ObserverProps">
        <div class="login-form-content">
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
        </div>
        <div class="form-btn-wrap">
          <button class="btn login-btn" 
          :disabled="ObserverProps.invalid || !ObserverProps.validated"
          @click="login">ログイン</button>
        </div>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { careManagerApi, keyPersonApi } from "@/http-common";
import { mapGetters, mapActions } from 'vuex'
export default {
  props: {
    formTitle: {
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
      'isHomeCareServiceProvider'
    ])
  },
  methods: {
    ...mapActions([
      'setLoggedInCareManagerData',
      'setLoggedInKeyPersonData'
    ]),
    async login() {
        if (this.isCareManager) {
          await this.loginCareManager();
        } else if (this.isKeyPerson) {
          await this.loginKeyPerson();
        } else if (this.isHomeCareServiceProvider) {
          await this.loginHomeCareServiceProvider();
        }
    },
    async loginCareManager() {
      try {
        const response = await careManagerApi.post(
          '/login', this.login_data
        );
        
        if (response.status === 200) {
          const login_data = {
            access_token: response.data.access_token,
            care_manager: response.data.care_manager
          };
          this.setLoggedInCareManagerData(login_data);
          this.$router.push({ name: 'CareReceiverList' });
        }
      } catch (error) {
        this.login_error = error.response.data.login_error;
      }
    },
    async loginKeyPerson() {
      try {
        const response = await keyPersonApi.post(
          '/login', this.login_data
        );
        const login_data = {
          access_token: response.data.access_token,
          key_person: response.data.key_person
        };
          
        if (response.status === 200) {
          this.setLoggedInKeyPersonData(login_data);
          this.$router.push({ name: 'KeyPersonDashboard' });
        }
      } catch (error) {
          this.login_error = error.response.data.login_error
      }
    },
    async loginHomeCareServiceProvider() {

    },
  }
}
</script>