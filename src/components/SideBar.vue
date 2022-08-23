<template>
  <div id="sidebar">
    <nav class="nav" v-show="this.$store.getters.isCareManager">
      <div>
        <ul class="menu-content" v-if="this.$store.getters.isCareManagerLoggedIn">
          <li>
            <router-link class="link" to="/care-receiver/list">被介護者一覧</router-link>
          </li>
          <li>
            <button class="btn-link" @click="showCareReceiverRegistrationPage">被介護者登録</button>
          </li>
          <li>
            <button class="btn-link" @click="showCareManagerUpdatePage">登録情報確認・変更</button>
          </li>
        </ul>
        <ul class="menu-content" v-else>
          <li>
            <button class="btn-link" @click="showCareManagerRegistrationPage">登録</button>
          </li>
          <li>
            <router-link class="link" to="/care-manager/login">ログイン</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <nav class="nav" v-show="this.$store.getters.isKeyPerson">
      <div>
        <ul class="menu-content" v-if="this.$store.getters.isKeyPersonLoggedIn">
          <li>
            <router-link class="link" to="/key-person/dashboard">ダッシュボード</router-link>
          </li>
        </ul>
        <ul class="menu-content" v-else>
          <li>
            <router-link class="link" to="/key-person/login">ログイン</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    showCareManagerRegistrationPage() {
      this.$router.push({
        name: 'CareManagerRegistration',
        query: { care_manager: null }
      });
    },
    showCareManagerUpdatePage() {
      this.$router.push({
        name: 'CareManagerUpdate',
        query: { care_manager: null }
      });
    },
    showCareReceiverRegistrationPage() {
      this.$router.push({
        name: 'CareReceiverRegistration',
        query: { care_receiver: null }
      });
    },
    showVisitDateTimeView(care_receiver) {
      const registered_flg = care_receiver.visit_datetime !== null;
      this.$router.push({
        name: 'CareManagerVisitDateTime',
        query: { care_receiver: care_receiver, registered_flg: registered_flg }
      });
    },
    displayCareReceiverRegistrationPage() {
    },
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
.menu-content {
  padding: 10px 0;
	margin-bottom: 10px;
	overflow: hidden;
}
.toggle:checked +.acd-lbl +.menu-content { /*開閉時*/
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
.btn-link {
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
.btn-link:hover {
  background-color: #212c9e;
}
</style>
