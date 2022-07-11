import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
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
      address: "住所"
    },
   },
});

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
