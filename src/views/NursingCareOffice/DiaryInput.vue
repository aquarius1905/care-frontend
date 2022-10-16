<template>
  <div class="diary">
    <h2 class="diary__ttl">日誌入力</h2>
    <div class="diary___form">
      <validation-observer v-slot="{ invalid }">
        <div class="form__info box-shadow">
          <div class="form__item">
            <validation-provider v-slot="{ errors }" rules="required|max:255">
              <label for="office_name" class="form__item-lbl">
                事業所名
                <span class="required__lbl">必須</span>
              </label>
              <input type="text" id="office_name" class="input" 
              v-model="nursing_care_office.office_name" name="事業所名"
                placeholder="デイサービスセンター　新橋">
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="form__item">
            <validation-provider v-slot="{ errors }" rules="required|max:255">
              <label for="corporate_name" class="form__item-lbl">
                法人名
                <span class="required__lbl">必須</span>
              </label>
              <input type="text" id="corporate_name" class="input"
                v-model="nursing_care_office.corporate_name"
                placeholder="社会福祉法人 港福祉会" required>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="form__item">
            <validation-provider v-slot="{ errors }" rules="required">
             <label class="form__item-lbl" for="survice_type">
                サービス種別
                <span class="required__lbl">必須</span>
              </label>
              <select id="survice_type" class="select" v-model="nursing_care_office.service_type">
                <option v-for="service_type in service_types" :key="service_type.id" :value="service_type">
                  {{ service_type.name }}
                </option>
              </select>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="form__item">
            <validation-provider v-slot="{ errors }" rules="required|numeric|length:10">
              <label class="form__item-lbl" for="office_number">
                事業所番号
                <span class="required__lbl">必須</span>
              </label>
              <input type="text" id="office_number" class="input" v-model="nursing_care_office.office_number" size="10" maxlength="10"
                placeholder="1370300000" required>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="form__item">
            <validation-provider v-slot="{ errors }" rules="required|numeric|length:7">
              <label class="form__item-lbl" for="post_code">
                郵便番号
                <span class="required__lbl">必須</span>
              </label>
              <div class="flex">
                <input type="text" id="post_code" class="input" v-model="nursing_care_office.post_code" placeholder="1050004" required>
                <button class="btn address-search__btn" @click="fetchAddress">住所検索</button>
              </div>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="form__item">
            <validation-provider v-slot="{ errors }" rules="required|max:255">
              <label class="form__item-lbl" for="address">
                住所
                <span class="required__lbl">必須</span>
              </label>
              <input type="text" id="address" class="input" v-model="nursing_care_office.address" placeholder="東京都港区新橋3-4-5"
                required>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
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
}
</script>