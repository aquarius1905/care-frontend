<template>
  <div id="header">
    <h1 class="main-ttl ttl" @click="backtoHome">Care</h1>
    <div class="logout-wrap" 
    v-show="this.isCareManagerLoggedIn || this.isKeyPersonLoggedIn || this.isNursingCareOfficeLoggedIn">
      <label class="name-lbl">{{ loggedInName }}</label>
      <button class="btn logout-btn" @click="logout">ログアウト</button>
    </div>
  </div>
</template>

<script>
import { api } from "@/http-common"
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'isCareManagerLoggedIn',
      'isKeyPersonLoggedIn',
      'isNursingCareOfficeLoggedIn',
      'getCareManagerName',
      'getKeyPersonName',
      'getContactPersonNameOfNursingCareOffice',
      'getCareManagerAccessToken',
      'getKeyPersonAccessToken',
      'getNursingCareOfficeAccessToken',
    ]),
    loggedInName: function () {
      if (this.isCareManagerLoggedIn) {
        return this.getCareManagerName;
      } else if (this.isKeyPersonLoggedIn) {
        return this.getKeyPersonName;
      } else if (this.isNursingCareOfficeLoggedIn) {
        return this.getContactPersonNameOfNursingCareOffice;
      }
    }
  },
  methods: {
    ...mapActions([
      'resetCareManager',
      'resetKeyPerson',
      'resetNursingCareOffice'
    ]),
    backtoHome() {
      this.$router.push({
        name: 'Home'
      });
    },
    async logoutCareManager() {
      try {
        api.defaults.headers.common['Authorization']
          = 'Bearer ' + this.getCareManagerAccessToken;
        const response = await api.post('/care-managers/logout');
          
        if (response.status === 200) {
          this.resetCareManager();
          this.$router.push({ name: 'CareManagerLogin' });
        }
      } catch (error) {
        console.log(error);
        alert("ログアウトに失敗しました");
      }
    },
    async logoutKeyPerson() {
      try {
        api.defaults.headers.common['Authorization']
          = 'Bearer ' + this.getKeyPersonAccessToken;
        const response = await api.post('/key-persons/logout');

        if (response.status === 200) {
          this.resetKeyPerson();
          this.$router.push({ name: 'KeyPersonLogin' });
        }
      } catch (error) {
        console.log(error);
        alert("ログアウトに失敗しました");
      }
    },
    async logoutNursingCareOffice() {
      try {
        api.defaults.headers.common['Authorization']
          = 'Bearer ' + this.getNursingCareOfficeAccessToken;
        const response = await api.post('/nursing-care-offices/logout');

        if (response.status === 200) {
          this.resetNursingCareOffice();
          this.$router.push({ name: 'NursingCareOfficeLogin' });
        }
      } catch (error) {
        console.log(error);
        alert("ログアウトに失敗しました");
      }
    },
    async logout() {
      if (confirm('ログアウトしますか？')) {
        if (this.isCareManagerLoggedIn) {
          await this.logoutCareManager();
        } else if (this.isKeyPersonLoggedIn) {
          await this.logoutKeyPerson();
        } else if (this.isNursingCareOfficeLoggedIn) {
          await this.logoutNursingCareOffice();
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