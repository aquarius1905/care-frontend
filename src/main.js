import Vue from 'vue'
import App from './App.vue'
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
  message: 'パスワードは半角英小文字、半角英大文字、半角数字をそれぞれ1種類以上含む12文字以上100文字以下で入力してください',
  validate(value) {
    if (value.match(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])[a-zA-Z0-9]{12,100}$/)) {
      return true;
    }
  }
})

//全角カタカタのカスタムルール
extend('full_sized_katakana', {
  message: '{_field_}は全角カタカナで入力してください',
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
      relationship: "続柄"
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
  render: h => h(App)
}).$mount('#app')
