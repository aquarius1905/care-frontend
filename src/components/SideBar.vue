<template>
  <div id="sidebar">
    <h1 class="ttl">Care</h1>
    <nav class="nav" id="nav">
      <div v-if="this.$store.getters.isCareManagerLoggedIn">
        <input id="care-manager" class="toggle" type="checkbox">
        <label class="acd-lbl" for="care-manager">ケアマネージャー</label>
        <ul class="acd-content">
          <li>
            <button class="btn-link" @click="displayCareReceiverRegistrationPage">被介護者一覧</button>
          </li>
          <li>
            <button class="btn-link" @click="displayCareReceiverRegistrationPage">被介護者登録</button>
          </li>
          <li>
            <router-link class="link" to="/care-manager/info">設定情報</router-link>
          </li>
          <li>
            <button class="btn-link" @click="logout">ログアウト</button>
          </li>
        </ul>
      </div>
      <div v-else>
        <input id="care-manager" class="toggle" type="checkbox">
        <label class="acd-lbl" for="care-manager">ケアマネージャー</label>
        <ul class="acd-content">
          <li>
            <button class="btn-link" @click="displayCareManagerRegistrationPage">登録</button>
          </li>
          <li>
            <router-link class="link" to="/care-manager/login">ログイン</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import axios from "axios";
export default {
  methods: {
    registerCareReceiver() {

    },
    displayCareManagerRegistrationPage() {
      this.$router.push({
        name: 'CareManagerRegistration',
        query: { care_manager: null }
      });
    },
    displayCareReceiverRegistrationPage() {
      this.$router.push({
        name: 'CareReceiverRegistration',
        query: {care_receiver: null, key_person: null}
      });
    },
    logout() {
      axios
        .post(`${process.env.VUE_APP_API_ORIGIN}/care-managers/logout`)
        .then(response => {
          if (response.status === 200) {
            this.$store.dispatch('logout');
            this.$router.push({
              name: 'CareManagerLogin'
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
}
</script>

<style>
#sidebar {
  width: 200px;
}
.ttl {
  color: #1A237E;
  font-size: 32px;
  padding: 10px 0 10px 20px;
  user-select: none;
}
.nav {
  background: #1A237E;
  width: 100%;
  height: 100vh;
}
.toggle {
  display: none;
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
.acd-lbl,
.acd-content {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transform: translateZ(0);
  transition: all .3s;
}
.acd-content {
	height: 0;
  padding: 0 20px;
	margin-bottom: 10px;
	overflow: hidden;
}
.toggle:checked +.acd-lbl +.acd-content { /*開閉時*/
  height: auto;
  padding: 10px 20px;
  transition: all .3s;
}
.toggle:checked + .acd-lbl::before {
  transform: rotate(-45deg) !important;
}
.link {
  text-decoration: none;
  color: #fff;
  font-size: 14px;
  width: 100%;
  line-height: 40px;
  height: 40px;
}
.btn-link {
  border: none;
  font-size: 14px;
  cursor: pointer;
  color: #fff;
  background: #1A237E;
  width: 100%;
  text-align: left;
  padding: 0;
  line-height: 40px;
  height: 40px;
}
</style>
