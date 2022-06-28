<template>
  <div class="care-manager-registration">
    <div class="care-manager-registration-form">
      <h2 class="form-ttl">ケアマネージャー登録</h2>
      <div class="form-content">
        <div class="form-item">
          <label>お名前</label>
          <div class="form-item-input">
            <label for="first_name">姓</label>
            <input type="text" id="first_name" class="input-form" v-model="first_name" required>
          </div>
          <div class="form-item-input">
            <label for="last_name">名</label>
            <input type="text" id="last_name" class="input-form" v-model="last_name" required>
          </div>
        </div>
      </div>
      <div class="form-btn-wrap">
        <button class="register-btn">登録</button>
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
.form-ttl {
  color: #fff;
  background-color: #0034ff;
  font-size: 20px;
  padding: 20px;
}
.care-manager-registration {
  background-color: #eee;
}
.care-manager-registration-form {
  background-color: #fff;
  width: 60%;
  margin: 0 auto;
  border-radius: 6px;
}
.form-item {
  display: flex;
  align-items: center;
}
.form-item-input {
  display: flex;
  align-items: center;
  margin-left: 20px;
}
.input-form {
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-left: 20px;
  padding: 0 10px;
  height: 48px;
  width: 100%;
  background: #eee;
  font-size: 18px;
}
.form-btn-wrap {
  text-align: center;
}
.register-btn {
  color: #fff;
  background-color: #0034ff;
  border: none;
  padding: 5px 0;
  width: 100px;
  font-size: 18px;
  border-radius: 6px;
}
</style>
