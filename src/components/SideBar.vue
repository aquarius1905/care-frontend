<template>
  <div id="sidebar">
    <nav class="nav" v-show="this.isCareManager">
      <div>
        <ul class="menu__content" v-if="this.isCareManagerLoggedIn">
          <li>
            <router-link class="link" to="/care-manager/index">
              ダッシュボード
            </router-link>
          </li>
          <li>
            <button class="btn__link" @click="moveToCareReceiverRegistrationPage">
              被介護者登録
            </button>
          </li>
          <li>
            <router-link class="link" to="/care-manager/update">
              登録情報確認・更新
            </router-link>
          </li>
          <ul class="menu__content" v-if="this.isCareManagerLoggedIn && this.isCareManagerDetail">
            <h2 class="menu__ttl">詳細メニュー</h2>
            <li>
              <router-link class="link" to="/care-manager/care-receiver/detail">
                被介護者詳細情報
              </router-link>
            </li>
            <li>
              <router-link class="link" :to="{ name: 'CareManagerVisitDateTime'}">
                訪問日時
              </router-link>
            </li>
            <li>
              <button class="btn__link">居宅サービス計画書</button>
            </li>
            <li>
              <router-link class="link" :to="{ name: 'CareReceiverWeeklyServiceSchedule'}">
                週間サービス計画表
              </router-link>
            </li>
            <li>
              <button class="btn__link">サービス利用票</button>
            </li>
          </ul>
        </ul>
        <ul class="menu__content" v-else>
          <li>
            <button class="btn__link" @click="moveToCareReceiverRegistrationPage">
            新規登録
            </button>
          </li>
          <li>
            <router-link class="link" to="/care-manager/login">ログイン</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <nav class="nav" 
      v-show="this.isCareReceiver && this.isCareReceiverLoggedIn">
      <div>
        <ul class="menu__content">
          <li>
            <router-link class="link" to="/care-receiver/index">
              ダッシュボード
            </router-link>
          </li>
          <li>
            <button class="btn__link" @click="moveToMonthlySchedulePage">
              月間スケジュール
            </button>
          </li>
          <li>
            <router-link class="link" to="/care-receiver/detail">
              登録情報確認
            </router-link>
          </li>
          <li>
            <router-link class="link" to="/care-receiver/care-manager-info">
              担当ケアマネージャー
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
    <nav class="nav" v-show="this.isNursingCareOffice">
      <div>
        <ul class="menu__content" v-if="this.isNursingCareOfficeLoggedIn">
          <li>
            <router-link class="link" to="/nursing-care-office/index">
              ダッシュボード
            </router-link>
          </li>
          <li>
            <router-link class="link" to="/nursing-care-office/update">
              登録情報確認・更新
            </router-link>
          </li>
        </ul>
        <ul class="menu__content" v-else>
          <li>
            <button class="btn__link" @click="moveToNursingCareOfficeRegistrationPage">
            新規登録
            </button>
          </li>
          <li>
            <router-link class="link" to="/nursing-care-office/login">ログイン</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'isCareManager',
      'isCareReceiver',
      'isNursingCareOffice',
      'isCareManagerLoggedIn',
      'isCareReceiverLoggedIn',
      'isNursingCareOfficeLoggedIn',
      'isCareManagerDetail',
      'getSelectedCareReceiver',
      'getLoggedInCareReceiver'
    ])
  },
  methods: {
    moveToCareReceiverRegistrationPage() {
      this.$router.push({
        name: 'CareManagerInput',
        query: { care_manager: null }
      });
    },
    moveToCareReceiverRegistrationPage() {
      this.$router.push({
        name: 'CareReceiverInput',
        query: { care_receiver: null }
      });
    },
    moveToNursingCareOfficeRegistrationPage() {
      this.$router.push({
        name: 'NursingCareOfficeInput',
        query: { nursing_care_office: null }
      });
    },
    moveToMonthlySchedulePage() {
      const date = new Date();
      this.$router.push({
        name: 'CareReceiverMonthlySchedule',
        query: { year_and_month: date.toDateString() }
      });
    }
  },
}
</script>

<style scoped>
#sidebar {
  width: 210px;
  height: 100%;
  top: 0px;
  transform: translateX(0%);
  box-shadow: 2px 0 4px 1px #888;
}
.nav {
  background: #1A237E;
  width: 100%;
  height: 100vh;
}
.acd-lbl {
  display: block;
  font-size: 16px;
  color: #fff;
  padding: 16px;
  cursor: pointer;
}
.acd-lbl::before { /*タイトル横の矢印*/
	content:"";
	width: 6px;
	height: 6px;
	border-top: 2px solid #fff;
	border-right: 2px solid #fff;
	-webkit-transform: rotate(45deg);
	position: absolute;
	top: calc(50% - 5px);
	right: 15px;
	transform: rotate(135deg);
}
.menu__content {
  padding: 10px 0;
	margin-bottom: 10px;
	overflow: hidden;
}
.toggle:checked +.acd-lbl +.menu__content { /*開閉時*/
  height: auto;
  padding: 10px 20px;
  transition: all .3s;
}
.toggle:checked + .acd-lbl::before {
  transform: rotate(-45deg) !important;
}
.link {
  display: inline-block;
  text-decoration: none;
  color: #fff;
  font-size: 14px;
  width: 100%;
  line-height: 40px;
  height: 40px;
  padding-left: 20px;
}
.btn__link {
  border: none;
  font-size: 14px;
  cursor: pointer;
  color: #fff;
  background-color: #1A237E;
  width: 100%;
  text-align: left;
  padding-left: 20px;
  line-height: 40px;
  height: 40px;
}
.link:hover,
.btn__link:hover {
  background-color: #212c9e;
}
.menu__ttl {
  color: #fff;
  padding: 20px;
  font-size: 16px;
}
</style>
