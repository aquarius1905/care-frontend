<template>
  <div class="reset-password">
    <div class="reset-password__form box-shadow">
      <h2 class="reset-password__ttl">パスワード再設定</h2>
      <validation-observer ref="obs" v-slot="ObserverProps">
        <div class="reset-password__form-content">
          <div class="form__item">
            <label class="form__item-lbl" for="email">メールアドレス</label>
            <label>{{ email }}</label>
          </div>
          <div class="form__item">
            <validation-provider v-slot="{ errors }" rules="required|password_rule">
              <label class="form__item-lbl" for="password">
                パスワード
                <span class="required__lbl">必須</span>
              </label>
              <input type="password" id="password" class="input" v-model="password" required>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="form__item">
            <validation-provider v-slot="{ errors }" rules="required|confirmed:password" vid="password">
              <label class="form__item-lbl" for="password_confirmation">
                パスワード（確認用）
                <span class="required__lbl">必須</span>
              </label>
              <input type="password" id="password_confirmation" class="input" v-model="password_confirmation" required>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <button class="btn reset-password__btn" :disabled="ObserverProps.invalid || !ObserverProps.validated"
            @click="resetPassword">パスワード再設定</button>
        </div>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import { api } from "@/plugins/axios";
export default {
  data() {
    return {
      token: null,
      email: null,
      password: null,
      password_confirmation: null
    }
  },
  methods: {
    async resetPassword() {
      try {
        const send_data = {
          email: this.email
        };
        const response = await api.post(this.path, send_data);
        if (response.status === 200) {
          alert("パスワード再設定のメールを送信しました。");
        }
      } catch (error) {
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
    const path = this.$route.path
    if (path.includes('care-manager')) {
      this.$store.dispatch('setCareManagerFlg');
    } else if (path.includes('care-receiver')) {
      this.$store.dispatch('setCareReceiverFlg');
    } else if (path.includes('nursing-care-office')) {
      this.$store.dispatch('setNursingCareOfficeFlg');
    }
    this.email = this.$route.query.email;
    this.token = this.$route.query.toekn;
  }
}
</script>

<style scoped>
.reset-password__form {
  background-color: #fff;
  width: 400px;
  margin: 50px auto 0;
  border-radius: 6px;
}

.reset-password__form-content {
  padding: 25px 20px 20px;
}
</style>