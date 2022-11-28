<template>
  <div class="forgot-password">
    <div class="forgot-password__form box-shadow">
      <h2 class="forgot-password__ttl">パスワードを忘れた方</h2>
      <validation-observer ref="obs" v-slot="ObserverProps">
        <div class="forgot-password__form-content">
          <div class="form__item">
            <label class="form__item-lbl" for="email">
              メールアドレス
              <span class="required__lbl">必須</span>
            </label>
            <validation-provider v-slot="{ errors }" rules="required|email">
              <div class="form__item-input">
                <input type="email" id="email" class="input" v-model="email" placeholder="test@sample.com"
                  required>
              </div>
              <div class="error">{{ errors[0] }}</div>
              <div class="error">{{ error }}</div>
            </validation-provider>
          </div>
          <button class="btn send-email__btn"
          :disabled="ObserverProps.invalid || !ObserverProps.validated"
          @click="sendForgotPasswordEmail">メール送信</button>
        </div>
      </validation-observer>
    </div>
    <Spinner v-if="spinner_flg"></Spinner>
  </div>
</template>

<script>
import Spinner from "@/components/Spinner"
import { api } from "@/plugins/axios"
import { mapGetters } from 'vuex'
export default {
  components: { Spinner },
  data() {
    return {
      path: null,
      email: null,
      error: null,
      spinner_flg: false
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
    async sendForgotPasswordEmail() {
      try {
        this.spinner_flg = true;
        const send_data = {
          email: this.email
        };
        const response = await api.post(this.path, send_data);
        
        if (response.status === 200) {
          let routerName = '';
          if (this.isCareManager) {
            routerName = 'CareManagerForgotPasswordCompleted'
          } else if (this.isCareReceiver) {
            routerName = 'CareReceiverForgotPasswordCompleted'
          } else if (this.isNursingCareOffice) {
            routerName = 'NursingCareOfficeForgotPasswordCompleted'
          }

          this.spinner_flg = false;

          this.$router.push({
            name: routerName,
            query: { msg: "パスワード再設定のメールを送信しました" }
          });
        }
      } catch (error) {
        this.spinner_flg = false;
        console.log(error);
        if (error.response.status === 401) {
          this.error = "メールアドレスが存在しません";
        } else {
          alert("メールの送信に失敗しました");
        }
      }
    }
  },
  created() {
    this.path = this.$route.query.path;
  }
}
</script>

<style scoped>
.forgot-password__form {
  background-color: #fff;
  width: 550px;
  margin: 50px auto 0;
  border-radius: 6px;
}

.forgot-password__form-content {
  padding: 25px 20px 20px;
}
</style>