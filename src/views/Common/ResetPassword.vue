<template>
  <div class="reset-password">
    <div class="reset-password__form box-shadow">
      <h2 class="forgot-password__ttl">{{ 'パスワード再設定' }}</h2>
      <validation-observer ref="obs" v-slot="ObserverProps">
        <div class="reset-password__form-content">
          <div class="form__item">
            <label class="form__item-lbl" for="email">メールアドレス</label>
            <validation-provider v-slot="{ errors }" rules="required|email">
              <div class="form__item-input">
                <input type="email" id="email" class="input" v-model="email" placeholder="test@sample.com"
                  required>
              </div>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <button class="btn reset-password__btn" 
          :disabled="ObserverProps.invalid || !ObserverProps.validated"
          @click="sendForgotPasswordEmail">メール送信</button>
        </div>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: {
    formTitle: String
  },
  data() {
    return {
      email: null
    }
  },
  methods: {
    async sendForgotPasswordEmail() {
      try {
        await axios.get("sanctum/csrf-cookie");
        await axios.post("forgot-password", this.email);
      } catch (e) {
      }
    }
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