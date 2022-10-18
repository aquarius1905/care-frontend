<template>
  <div class="contact-book">
    <h2 class="contact-book__ttl">日誌</h2>
    <div class="contact-book__content box-shadow">
      <validation-observer v-slot="{ invalid }">
        <div class="form__item">
          <label class="form__item-lbl">日付</label>
          <label>{{ $dayjs(contact_book.date).format("YYYY年MM月DD日（ddd）") }}</label>
        </div>
        <div class="form__item">
          <label class="form__item-lbl">名前</label>
          <label>{{ contact_book.care_receiver_name }}</label>
        </div>
        <div class="form__item">
          <label class="form__item-lbl">ご家庭での状況</label>
          <label>{{ contact_book.situation_at_home }}</label>
        </div>
        <div class="form__item">
          <validation-provider v-slot="{ errors }" rules="required">
            <div>
              <label for="body_temperature" class="form__item-lbl">
                体温
                <span class="required__lbl">必須</span>
              </label>
              <div class="body-temperature-input__wrap">
                <input type="number" id="body_temperature" class="input body-temperature__input"
                  v-model="contact_book.body_temperature" placeholder="36.0" required>
              </div>
              <div class="error">{{ errors[0] }}</div>
            </div>
          </validation-provider>
        </div>
        <div class="form__item">
            <validation-provider v-slot="{ errors }" rules="required">
              <label for="blood_pressure"  class="form__item-lbl">
                血圧
                <span class="required__lbl">必須</span>
              </label>
              <div class="blood-pressure__wrap">
                <input type="number" id="blood_pressure" class="input blood-pressure__input"
                  v-model="contact_book.systonic_blood_pressure" placeholder="120" required>
                  /
                <input type="number" id="blood_pressure" class="input blood-pressure__input"
                  v-model="contact_book.diastolic_blood_pressure" placeholder="80" required>
              </div>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
        </div>
        <div class="form__item">
          <validation-provider v-slot="{ errors }" rules="required">
            <div>
              <label for="pulse" class="form__item-lbl">
                脈拍
                <span class="required__lbl">必須</span>
              </label>
              <div class="pulse-input__wrap">
                <input type="number" id="pulse" class="input pulse__input"
                  v-model="contact_book.pulse" placeholder="70" required>
              </div>
              <div class="error">{{ errors[0] }}</div>
            </div>
          </validation-provider>
        </div>
        <div class="form__item">
          <validation-provider v-slot="{ errors }" rules="required">
            <div>
              <label class="form__item-lbl">
                食事量
                <span class="required__lbl">必須</span>
              </label>
              <div class="staple_food-input__wrap">
                <label for="staple_food">主食</label>
                <input type="number" id="staple_food" class="input staple-food__input" v-model="contact_book.staple_food" placeholder="10"
                  required>
              </div>
              <div class="error">{{ errors[0] }}</div>
            </div>
          </validation-provider>
        </div>
        <div class="form__item">
          <validation-provider v-slot="{ errors }" rules="max:255">
            <label for="special_notes" class="form__item-lbl">特記事項</label>
            <textarea id="special_notes" class="special-notes" v-model="contact_book.special_notes"></textarea>
            <div class="error">{{ errors[0] }}</div>
          </validation-provider>
        </div>
        <div class="form__item">
          <validation-provider v-slot="{ errors }" rules="required|max:255">
            <label for="entry_person" class="form__item-lbl">
              記入者
              <span class="required__lbl">必須</span>
            </label>
            <input type="text" class="input" placeholder="佐藤">
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
import dayjs from 'dayjs';
export default {
  data() {
    return {
      contact_book: {
        care_receiver_id: null,
        care_receiver_name: null,
        date: dayjs().format('YYYY-MM-DD'),
        situation_at_home: 'ー',
        body_temperature: null,
        systonic_blood_pressure: null,
        diastolic_blood_pressure: null,
        pulse: null,
        staple_food: null,
        special_notes: null,
        entry_person: null
      }
    }
  },
  created() {
    this.contact_book.care_receiver_id = this.$route.query.care_receiver_id;
    this.contact_book.care_receiver_name = this.$route.query.care_receiver_name;
  }
}
</script>

<style scoped>
.contact-book {
  margin: 20px auto 50px;
  width: 500px;
}
.special-notes {
  resize: none;
  width: 95%;
  height: 100px;
  padding: 10px;
  font-size: 16px;
}
.body-temperature__wrap {
  display: flex;
}
.body-temperature-input__wrap {
  display: flex;
  align-items: center;
}
.body-temperature-input__wrap::after {
  content: "℃";
  font-size: 16px;
}
.body-temperature__input,
.blood-pressure__input,
.pulse__input,
.staple-food__input{
  width: 30%;
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
  font-size: 16px;
}
.pulse-input__wrap::after {
  content: "回/分";
  font-size: 16px;
}
.staple_food-input__wrap::after {
  content: "割";
  font-size: 16px;
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
  margin-left: 10px;
}
.form__item-lbl {
  vertical-align: center;
}
</style>