<template>
  <div class="contact-book">
    <h2 class="contact-book__ttl">連絡帳</h2>
    <div class="contact-book__content box-shadow">
      <validation-observer v-slot="{ invalid }">
        <div class="form__item">
          <validation-provider v-slot="{ errors }" rules="required|max:255">
            <label for="situation_at_home" class="form__item-lbl">
              ご家庭での状況
            </label>
            <label>{{ contact_book.situation_at_home }}</label>
            <div class="error">{{ errors[0] }}</div>
          </validation-provider>
        </div>
        <div class="form__item">
          <validation-provider v-slot="{ errors }" rules="required">
            <label for="body_temperature" class="form__item-lbl">
              体温
              <span class="required__lbl">必須</span>
            </label>
            <div class="body-temerature__wrap">
              <input type="number" id="body_temperature" class="input body-temperature__input"
                v-model="contact_book.body_temperature" placeholder="36.0" required>
            </div>
            <div class="error">{{ errors[0] }}</div>
          </validation-provider>
        </div>
        <div class="form__item">
          <validation-provider v-slot="{ errors }" rules="">
            <label for="body_temperature_retest" class="form__item-lbl">
              体温（再検）
            </label>
            <div class="body-temerature__wrap">
              <input type="number" id="body_temperature_retest" class="input body-temperature__input"
                v-model="contact_book.body_temperature" placeholder="36.0">
            </div>
            <div class="error">{{ errors[0] }}</div>
          </validation-provider>
        </div>
        <div class="form__item">
          <validation-provider v-slot="{ errors }" rules="">
            <label for="blood_pressure"  class="form__item-lbl">
              血圧
              <span class="required__lbl">必須</span>
            </label>
            <div class="blood-pressure__wrap">
              <input type="number" id="body_temperature_retest" class="input body-temperature__input"
                v-model="contact_book.body_temperature" placeholder="36.0" required>
            </div>
            <div class="error">{{ errors[0] }}</div>
          </validation-provider>
        </div>
        <div class="form__item">
          <validation-provider v-slot="{ errors }" rules="">
            <label for="blood_pressure" class="form__item-lbl">
              血圧（再検）
            </label>
            <div class="blood-pressure__wrap">
              <input type="number" id="body_temperature_retest" class="input body-temperature__input"
                v-model="contact_book.body_temperature_retest" placeholder="36.0">
            </div>
            <div class="error">{{ errors[0] }}</div>
          </validation-provider>
        </div>
        <button class="btn confirm__btn" :disabled="invalid">
          入力内容確認
        </button>
      </validation-observer>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      contact_book: {
        situation_at_home: '記載なし',
        body_temperature: null,
        body_temperature_retest: null,
        blood_pressure: null,
        blood_pressure_retest: null,
        special_notes: null
      }
    }
  }
}
</script>

<style scoped>
.situation_at_home,
.special-notes {
  resize: none;
  width: 95%;
  height: 100px;
  padding: 10px;
  font-size: 16px;
}
.body-temerature__wrap::after {
  content: "℃";
}
.body-temperature__input,
.blood-pressure__input {
  width: 90%;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  margin: 0;
  -webkit-appearance: none;
  appearance: none;
}
input[type="number"] {
  -moz-appearance: textfield;
  appearance: none;
  margin-right: 10px;
}
.blood-pressure__wrap::after {
  content: "mmHg";
}
.body-temerature__wrap,
.blood-pressure__wrap,
.food-amount__wrap {
  display: flex;
  align-items: center;
}

.staple-food__wrap,
.side_dish__wrap {
  display: flex;
  align-items: center;
  margin-left: 30px;
}
.staple-food__input-wrap,
.side-dish__input-wrap {
  margin-left: 10px;
}
.staple-food__input-wrap::after,
.side-dish__input-wrap::after {
  content: ' 割';
}

.staple-food__input,
.side-dish__input {
  width: 100px;
}
.contact-book__tbl {
  width: 100%;
}
.contact-book__tbl th {
  width: 40%;
  font-weight: 500;
  text-align: left;
  height: 60px;
}
.contact-book__tbl td {
  width: auto;
  text-align: left;
  height: 60px;
}
</style>