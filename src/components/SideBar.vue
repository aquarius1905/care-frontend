<template>
  <div>
    <nav class="nav" id="nav">
      <ul v-if="isLoggedin">
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
      <ul v-else>
        <li>
          <button class="btn-link" @click="displayCareManagerRegistrationPage">ケアマネージャー登録</button>
        </li>
        <li>
          <router-link class="link" to="/care-manager/login">ケアマネージャーログイン
          </router-link>
        </li>
      </ul>
    </nav>
    <!-- <div class="menu" id="menu" @click="toggleMenu">
      <span class="menu__line--top"></span>
      <span class="menu__line--middle"></span>
      <span class="menu__line--bottom"></span>
    </div> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  methods: {
    toggleMenu() {
      // const target = document.getElementById("menu");
      // target.classList.toggle('open');
      // const nav = document.getElementById("nav");
      // nav.classList.toggle('in');
    },
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
  computed: {
    isLoggedin() {
      return this.$store.getters.isCareManagerLoggedIn;
    }
  }
}
</script>

<style>
.nav {
  position: fixed;
  top: 90px;
  left: 0;
  background: #1A237E;
  width: 15%;
  height: 100vh;
}
.nav ul {
  padding-top: 20px;
}
.nav ul li {
  list-style-type: none;
}
.link {
  text-decoration: none;
  color: #fff;
  font-size: 16px;
  width: 100%;
  height: 100%;
  line-height: 50px;
  padding-left: 20px;
}
.btn-link {
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #fff;
  background: transparent;
  padding: 20px;
}
.menu {
  display: inline-block;
  width: 28px;
  height: 26px;
  cursor: pointer;
  position: relative;
  left: 20px;
  top: 20px;
}

.menu__line--top,
.menu__line--middle,
.menu__line--bottom {
  display: inline-block;
  width: 100%;
  height: 4px;
  background-color: #f5f5f5;
  position: absolute;
  transition: 0.5s;
}

.menu__line--top {
  top: 0;
}

.menu__line--middle {
  top: 11px;
}

.menu__line--bottom {
  bottom: 0;
}

.menu.open span:nth-of-type(1) {
  top: 14px;
  transform: rotate(45deg);
}

.menu.open span:nth-of-type(2) {
  opacity: 0;
}

.menu.open span:nth-of-type(3) {
  top: 14px;
  transform: rotate(-45deg);
}

.in {
  transform: translateX(100%);
}
</style>
