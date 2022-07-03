<template>
  <div class="care-manager-login">
    <div class="care-manager-login-form box-shadow">
      <h2 class="form-ttl">ケアマネージャー ログイン</h2>
      <div class="login-form-content">
        <div class="form-item">
          <label class="form-item-lbl" for="registration_number">介護支援専門員登録番号</label>
          <div class="form-item-input">
            <input type="text" id="registration_number" class="input-form" v-model="first_name" placeholder="13000000"
              required>
          </div>
        </div>
        <div class="form-item">
          <label class="form-item-lbl" for="password">パスワード</label>
          <div class="form-item-input">
            <input type="email" id="password" class="input-form" v-model="first_name" required>
          </div>
        </div>
      </div>
      <div class="form-btn-wrap">
        <button class="btn">ログイン</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      first_name: null,
      last_name: null,
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
</style>
