<template>
  <div id="header">
    <h1 class="main-ttl ttl" @click="backtoHome">Care</h1>
    <div class="logout-wrap" v-show="isLoggedIn">
      <label class="name-lbl">{{ loggedInName }}</label>
      <button class="btn logout-btn" @click="logout">ログアウト</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      is_caremanager_loggedin: false,
      is_keyperson_loggedin: false
    }
  },
  computed: {
    isLoggedIn: function () {
      this.is_caremanager_loggedin = this.$store.getters.isCareManagerLoggedIn;
      this.is_keyperson_loggedin = this.$store.getters.isKeyPersonLoggedIn;
      return this.is_caremanager_loggedin || this.is_caremanager_loggedin;
    },
    loggedInName: function () {
      if (this.is_caremanager_loggedin) {
        return this.$store.getters.getCareManagerName + ' (ケアマネージャー)';
      } else if (this.is_keyperson_loggedin) {
        return this.$store.getters.getKeyPersonName + ' (キーパーソン)';
      }
      return '';
    }
  },
  methods: {
    backtoHome() {
      this.$router.push({
        name: 'Home'
      });
    },
    async logoutCareManager() {
      axios.defaults.headers.common['Authorization']
        = 'Bearer ' + this.$store.getters.getCareManagerAccessToken;
      const response = await axios.post(`${process.env.VUE_APP_API_ORIGIN}/care-managers/logout`);

      if (response.status === 200) {
        axios.defaults.headers.common['Authorization'] = null;
        await this.$store.dispatch('logoutCareManager');
        this.$router.push({ name: 'CareManagerLogin' });
      } else {
        console.log(error);
      }
    },
    async logoutKeyPerson() {
      axios.defaults.headers.common['Authorization']
        = 'Bearer ' + this.$store.getters.getKeyPersonAccessToken;
      const response = await axios.post(`${process.env.VUE_APP_API_ORIGIN}/key-persons/logout`);

      if (response.status === 200) {
        axios.defaults.headers.common['Authorization'] = null;
        await this.$store.dispatch('logoutKeyPerson');
        this.$router.push({ name: 'KeyPersonLogin' });
      } else {
        console.log(error);
      }
    },
    async logout() {
      if (confirm('ログアウトしますか？')) {
        if (this.$store.getters.isCareManagerLoggedIn) {
          await this.logoutCareManager();
        } else if (this.$store.getters.isKeyPersonLoggedIn) {
          await this.logoutKeyPerson();
        }
      }
    }
  },
}
</script>

<style scoped>
#header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 10px 20px;
}
.main-ttl {
  user-select: none;
  cursor: pointer;
}
.logout-wrap {
  display: flex;
  align-items: center;
}
.name-lbl {
  margin-right: 20px;
}
.logout-btn {
  width: 130px;
}
</style>
