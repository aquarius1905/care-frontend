<template>
  <div id="sidebar">
    <h1 class="main-ttl ttl" @click="backtoHome">Care</h1>
    <nav class="nav" v-show="isCareManagerURL">
      <h2 class="menu-ttl">ケアマネージャー</h2>
      <div>
        <ul class="acd-content" v-if="this.$store.getters.isCareManagerLoggedIn">
          <li>
            <router-link class="link" to="/care-receiver/list">被介護者一覧</router-link>
          </li>
          <li>
            <button class="btn-link" @click="showCareReceiverRegistrationPage">被介護者登録</button>
          </li>
          <li>
            <button class="btn-link" @click="showCareManagerUpdatePage">登録情報確認・変更</button>
          </li>
          <li>
            <button class="btn-link" @click="showVisitDateTimePage">訪問日時登録・確認・変更</button>
          </li>
          <li>
            <button class="btn-link" @click="logout">ログアウト</button>
          </li>
        </ul>
        <ul class="acd-content" v-else>
          <li>
            <button class="btn-link" @click="showCareManagerRegistrationPage()">登録</button>
          </li>
          <li>
            <router-link class="link" to="/care-manager/login">ログイン</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <nav class="nav" v-show="isKeyPersonURL">
      <h2 class="menu-ttl">キーパーソン</h2>
      <div>
        <ul class="acd-content" v-if="this.$store.getters.isKeyPersonLoggedIn">
          <li>
            <button class="btn-link" @click="logout">ログアウト</button>
          </li>
        </ul>
        <ul class="acd-content" v-else>
          <li>
            <router-link class="link" to="/key-person/login">ログイン</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import axios from "axios";
export default {
  computed: {
    isCareManagerURL: function () {
      const path = this.$route.path
      return path.includes('care-manager') || path.includes('care-receiver');
    },
    isKeyPersonURL: function () {
      return this.$route.path.includes('key-person');
    },
    isCareReceiverURL: function () {
      return this.$route.path.includes('care-receiver');
    }
  },
  methods: {
    backtoHome() {
      this.$router.push({
        name: 'Home'
      });
    },
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
        query: { care_receiver: null, key_person: null }
      });
    },
    showVisitDateTimePage() {
      this.$router.push({
        name: 'CareManagerVisitDateTime'
      });
    },
    logout() {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' +  this.$store.getters.getCareManagerAccessToken;
      axios
        .post(`${process.env.VUE_APP_API_ORIGIN}/care-managers/logout`)
        .then(response => {
          if (response.status === 200) {
            axios.defaults.headers.common['Authorization'] = null;
            this.$store.dispatch('logoutCareManager');
            this.$router.push({
              name: 'CareManagerLogin'
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    showCareReceiverDeitalPage() {
    },
    displayCareReceiverRegistrationPage() {
    },
    showVisitDateTiemPage() {
    }
  },
}
</script>

<style>
#sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 210px;
}
.main-ttl {
  padding: 15px;
  user-select: none;
  cursor: pointer;
}
.nav {
  background: #1A237E;
  width: 100%;
  height: 100vh;
}
.menu-ttl {
  color: #fff;
  padding: 20px 0 0 20px;
  font-size: 16px;
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
.acd-content {
  padding: 10px 20px;
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
