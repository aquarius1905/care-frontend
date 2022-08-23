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
import { careManagerApi, keyPersonApi } from "@/http-common"
export default {
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isCareManagerLoggedIn || this.$store.getters.isKeyPersonLoggedIn;
    },
    loggedInName: function () {
      if (this.$store.getters.isCareManagerLoggedIn) {
        return this.$store.getters.getCareManagerName + ' (ケアマネージャー)';
      } else if (this.$store.getters.isKeyPersonLoggedIn) {
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
      try {
        careManagerApi.defaults.headers.common['Authorization']
          = 'Bearer ' + this.$store.getters.getCareManagerAccessToken;
        const response = await careManagerApi.post('/logout');
          
        if (response.status === 200) {
          this.$store.dispatch('logoutCareManager');
          this.$router.push({ name: 'CareManagerLogin' });
        }
      } catch (error) {
        console.log(error);
        alert("ログアウトに失敗しました");
      }
    },
    async logoutKeyPerson() {
      try {
        keyPersonApi.defaults.headers.common['Authorization']
          = 'Bearer ' + this.$store.getters.getKeyPersonAccessToken;
        const response = await keyPersonApi.post('/logout');

        if (response.status === 200) {
          await this.$store.dispatch('logoutKeyPerson');
          this.$router.push({ name: 'KeyPersonLogin' });
        }
      } catch (error) {
        console.log(error);
        alert("ログアウトに失敗しました");
      }
    },
    logout() {
      if (confirm('ログアウトしますか？')) {
        if (this.$store.getters.isCareManagerLoggedIn) {
          this.logoutCareManager();
        } else if (this.$store.getters.isKeyPersonLoggedIn) {
          this.logoutKeyPerson();
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
  z-index: 1000;
  height: 60px;
  padding: 10px 20px;
  box-shadow: 0 1px 5px 0 #888;
  background-color: #fff;
  position: relative;
  box-sizing: border-box;
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
  width: 120px;
  font-size: 16px;
}
</style>
