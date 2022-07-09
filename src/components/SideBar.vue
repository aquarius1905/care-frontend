<template>
  <div>
    <nav v-if="$store.getters.isCareManagerAccessToken" class="nav" id="nav">
      <ul>
        <li>
          <router-link class="link" to="/care-manager/register">ケアマネージャー登録</router-link>
        </li>
        <li>
          <router-link class="link" to="/care-manager/login">ケアマネージャーログイン</router-link>
        </li>
      </ul>
    </nav>
    <nav v-else class="nav" id="nav">
      <ul>
        <li>
          <router-link class="link" to="/care-receiver/register">被介護者登録</router-link>
        </li>
        <li>
          <button class="btn-link" @click="logout">ログアウト</button>
        </li>
      </ul>
    </nav>
    <div class="menu" id="menu" @click="toggleMenu">
      <span class="menu__line--top"></span>
      <span class="menu__line--middle"></span>
      <span class="menu__line--bottom"></span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  methods: {
    toggleMenu() {
      const target = document.getElementById("menu");
      target.classList.toggle('open');
      const nav = document.getElementById("nav");
      nav.classList.toggle('in');
    },
    registerCareReceiver() {

    },
    logout() {
      axios
        .post(`${process.env.VUE_APP_API_ORIGIN}/care-managers/logout`)
        .then(response => {
          console.log(response);
          this.$store.dispatch('logout');
          console.log(this.$store.getters.isCareManagerAuthenticated);
          this.$router.push({
            name: 'CareManagerLogin'
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
}
</script>

<style>
.nav {
  position: absolute;
  height: 100vh;
  width: 100%;
  left: -100%;
  background: #eee;
  transition: .7s;
  text-align: center;
}

.nav ul {
  padding-top: 80px;
}

.nav ul li {
  list-style-type: none;
  margin-top: 50px;
}
.link {
  text-decoration: none;
  color: #1A237E;
  font-size: 30px;
}
.btn-link {
  border: none;
  font-size: 30px;
  cursor: pointer;
}
.menu {
  display: inline-block;
  width: 36px;
  height: 32px;
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
  background-color: #1A237E;
  position: absolute;
  transition: 0.5s;
}

.menu__line--top {
  top: 0;
}

.menu__line--middle {
  top: 14px;
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
