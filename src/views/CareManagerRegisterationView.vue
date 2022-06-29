<template>
  <div class="care-manager-registration">
    <div class="care-manager-registration-form box-shadow">
      <h2 class="form-ttl">ケアマネージャー 登録</h2>
      <div class="form-content">
        <div class="form-item">
          <label class="form-item-lbl">お名前</label>
          <div class="form-item-input">
            <label for="first_name" class="name_lbl">姓</label>
            <input type="text" id="first_name" class="input-form first-name-input" v-model="first_name" placeholder="山田"
              required>
          </div>
          <div class="form-item-input">
            <label for="last_name" class="name_lbl">名</label>
            <input type="text" id="last_name" class="input-form" v-model="last_name" placeholder="太郎" required>
          </div>
        </div>
        <div class="form-item">
          <label class="form-item-lbl">フリガナ</label>
          <div class="form-item-input">
            <label for="first_name_furigana" class="name_lbl">セイ</label>
            <input type="text" id="first_name_furigana" class="input-form first-name-input" v-model="first_name"
              placeholder="ヤマダ" required>
          </div>
          <div class="form-item-input">
            <label for="last_name_furigana" class="name_lbl">メイ</label>
            <input type="text" id="last_name_furigana" class="input-form" v-model="last_name" placeholder="タロウ"
              required>
          </div>
        </div>
        <div class="form-item">
          <label class="form-item-lbl" for="registration_number">介護支援専門員登録番号</label>
          <div class="form-item-input">
            <input type="text" id="registration_number" class="input-form" v-model="first_name" placeholder="1300000000" required>
          </div>
        </div>
        <div class="form-item">
          <label class="form-item-lbl" for="suport_office">所属居宅介護支援事業所</label>
          <div class="form-item-input">
            <input type="text" id="suport_office" class="input-form" v-model="first_name" placeholder="ケアプランセンター新橋" required>
          </div>
        </div>
        <div class="form-item">
          <label class="form-item-lbl" for="email">メールアドレス</label>
          <div class="form-item-input">
            <input type="email" id="email" class="input-form" v-model="first_name" placeholder="taro_yamada@sample.com"
              required>
          </div>
        </div>
        <div class="form-item">
          <label class="form-item-lbl" for="tel">電話番号</label>
          <div class="form-item-input">
            <input type="email" id="tel" class="input-form" v-model="first_name" placeholder="09012345678" required>
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
        <button class="btn">登録</button>
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
.form-content {
  padding: 20px;
}
.care-manager-registration {
  background-color: #eee;
}
.care-manager-registration-form {
  background-color: #fff;
  max-width: 600px;
  margin: 0 auto;
  border-radius: 6px;
}
.form-item {
  margin-bottom: 30px;
}
.form-item:last-child {
  margin-bottom: 0;
}
.form-item-lbl {
  display: inline-block;
  font-weight: bold;
  margin-bottom: 10px;
}
.form-item-input {
  display: flex;
  align-items: center;
}
.first-name-input {
  margin-bottom: 10px;
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
.name_lbl {
  width: 100px;
}
.form-btn-wrap {
  text-align: center;
  padding: 20px 0;
}
</style>
