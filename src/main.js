import Vue from 'vue'
import App from './App.vue'
import axios from './plugins'
import router from './router'
import store from './store'
import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import { ValidationProvider, ValidationObserver, extend, localize } from 'vee-validate';
import * as originalRules from 'vee-validate/dist/rules';
import ja from 'vee-validate/dist/locale/ja.json';

// 全てのルールをインポート
let rule;
for (rule in originalRules) {
  extend(rule, {
    ...originalRules[rule],
  });
}

//パスワードのカスタムルール
extend('password_rule', {
  message: "パスワードは半角英数字(A~Z,a~z,0~9)最低1文字ずつ含めた8文字以上24文字以下で入力してください",  
  validate(value) {
    if (value.match(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])[a-zA-Z0-9]{8,24}$/)) {
      return true;
    }
  }
})

//全角カタカタのカスタムルール
extend('full_sized_katakana', {
  message: "{_field_}は全角カタカナで入力してください",
  validate(value) {
    if (value.match(/^[ァ-ヶー]+$/)) {
      return true;
    }
  }
})

// 日本語に設定
localize('ja', ja);
localize({
  ja: {
    names: {
      last_name: "姓",
      first_name: "名",
      last_name_furigana: "セイ",
      first_name_furigana: "メイ",
      registration_number: "介護支援専門員登録番号",
      suport_office: "居宅介護支援事業所",
      email: "メールアドレス",
      tel: "電話番号",
      password: "パスワード",
      post_code: "郵便番号",
      address: "住所",
      birthday: "生年月日",
      insurer_number: "保険者番号",
      insured_number: "被保険者番号",
      relationship: "続柄",
      visit_date: "訪問日",
      visit_time: "時間",
      office_name: "事業所名",
      corporate_name: "法人名",
      office_number: "事業所番号",
      service_type: "サービス種別"
    },
   },
});

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

Vue.config.productionTip = false

// ロケール設定
dayjs.locale('ja')
Vue.prototype.$dayjs = dayjs;

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
