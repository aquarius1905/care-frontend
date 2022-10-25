<template>
  <div>
    <div class="forgot-password-form box-shadow">
      <h2 class="forgot-password__ttl">{{ 'パスワード再設定' + formTitle }}</h2>
      <validation-observer ref="obs" v-slot="ObserverProps">
        <div class="forgot-password-form-content">
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
          @click="sendForgotPasswordEmail">パスワードリセット</button>
        </div>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: {
    formTitle: {
      type: String
    }
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
.reset-password__btn {
  width: 200px;
}
</style>