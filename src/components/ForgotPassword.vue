<template>
  <div>
    <div class="forgot-password-form box-shadow">
      <h2 class="form-ttl">{{ 'パスワード再設定' + formTitle }}</h2>
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
        </div>
        <div class="form-btn-wrap">
          <button class="btn send-mail-btn"
          :disabled="ObserverProps.invalid || !ObserverProps.validated"
          @click="sendEmail">メール送信</button>
        </div>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import { api } from "@/http-common";
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
    async sendEmail() {
      const response = await api.post(
        '/care-managers/forgot-password', this.email
      );
    }
  }
}
</script>