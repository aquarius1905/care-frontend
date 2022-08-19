<template>
  <div id="header">
    <h1 class="main-ttl ttl" @click="backtoHome">Care</h1>
    <div class="logout-wrap" v-show="isLoggedIn">
      <label class="name-lbl">{{ logged_in_name }}</label>
      <button class="btn logout-btn" @click="logout">ログアウト</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isCareManagerLoggedIn ||
        this.$store.getters.isKeyPersonLoggedIn;
    }
  },
  data() {
    return {
      logged_in_name: ''
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
  mounted() {
    if (this.$store.getters.isCareManagerLoggedIn) {
      this.logged_in_name = this.$store.getters.getCareManagerName + ' (ケアマネージャー)'
    } else if (this.$store.getters.isKeyPersonLoggedIn) {
      this.logged_in_name = this.$store.getters.get
    }
    
  }
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
logout .main-ttl {
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
