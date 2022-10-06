<template>
  <div id="header">
    <h1 class="main__ttl ttl" @click="backtoHome">Care</h1>
    <div class="logout__wrap" 
    v-show="this.isCareManagerLoggedIn || this.isCareReceiverLoggedIn || this.isNursingCareOfficeLoggedIn">
      <!-- <div v-if="this.isCareReceiverLoggedIn">
        <label class="name__lbl">
          被介護者：{{ loggedInName }}
        </label>
        <label class="name__lbl">
          キーパーソン：{{ keyperson_name }}
        </label>
      </div>
      <div v-else>
        <label class="name__lbl">{{ loggedInName }}</label>
      </div> -->
      <button class="btn logout__btn" @click="logout">ログアウト</button>
    </div>
  </div>
</template>

<script>
import { careManagerAuthApi, careReceiverAuthApi, nursingCareOfficeAuthApi } from "@/plugins/axios";
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      loggedin_name: null
    }
  },
  computed: {
    ...mapGetters([
      'isCareManagerLoggedIn',
      'isCareReceiverLoggedIn',
      'isNursingCareOfficeLoggedIn',
      'getLoggedInCareManagerName',
      'getLoggedInCareReceiverName',
      'getContactPersonNameOfNursingCareOffice',
    ]),
    // ...mapGetters({
    //   keyperson_name: 'getLoggedInKeyPersonName'
    // }),
    // loggedInName: function () {
    //   if (this.isCareManagerLoggedIn) {
    //     return this.getLoggedInCareManagerName;
    //   } else if (this.isCareReceiverLoggedIn) {
    //     return this.getLoggedInCareReceiverName;
    //   } else if (this.isNursingCareOfficeLoggedIn) {
    //     return this.getContactPersonNameOfNursingCareOffice;
    //   }
    // },
  },
  methods: {
    ...mapActions([
      'resetCareManager',
      'resetCareReceiver',
      'resetNursingCareOffice'
    ]),
    backtoHome() {
      this.$router.push({
        name: 'Home'
      });
    },
    async logoutCareManager() {
      try {
        const response = await careManagerAuthApi.post(
          '/care-managers/logout'
        );

        if (response.status === 200) {
          this.resetCareManager();
          this.$router.push({ name: 'CareManagerLogin' });
        }
      } catch (error) {
        console.log(error);
        alert("ログアウトに失敗しました");
      }
    },
    async logoutCareReceiver() {
      try {
        const response = await careReceiverAuthApi.post(
          '/care-receivers/logout'
        );

        if (response.status === 200) {
          this.resetCareReceiver();
          this.$router.push({ name: 'CareReceiverLogin' });
        }
      } catch (error) {
        console.log(error);
        alert("ログアウトに失敗しました");
      }
    },
    async logoutNursingCareOffice() {
      try {
        const response = await nursingCareOfficeAuthApi.post(
          '/nursing-care-offices/logout'
        );

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
        } else if (this.isCareReceiverLoggedIn) {
          await this.logoutCareReceiver();
        } else if (this.isNursingCareOfficeLoggedIn) {
          await this.logoutNursingCareOffice();
        }
      }
    },
    created() {
      console.log('Header created');
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
.main__ttl {
  user-select: none;
  cursor: pointer;
}
.logout__wrap {
  display: flex;
  align-items: center;
}
.name__lbl {
  margin-right: 20px;
}
.logout__btn {
  width: 120px;
  font-size: 16px;
}
</style>