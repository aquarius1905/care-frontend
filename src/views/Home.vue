<template>
  <div id="home">
    <div class="home-btn__box box-shadow">
      <h1 class="app__ttl">Care</h1>
        <button class="btn home__btn " @click="showCareManagerLoginPage()">
        ケアマネージャーの方はこちら
        </button>
        <button class="btn home__btn " @click="showCareReceiverLoginPage()">
        被介護者、キーパーソンの方はこちら
        </button>
        <button class="btn home__btn " @click="showNursingCareOfficeLoginPage()">
        介護事業所の方はこちら
        </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions([
      'setCareManagerFlg',
      'setCareReceiverFlg',
      'setNursingCareOfficeFlg'
    ]),
    showCareManagerLoginPage() {
      this.setCareManagerFlg;
      this.$router.push({
        name: 'CareManagerLogin'
      });
    },
    showCareReceiverLoginPage() {
      this.setCareReceiverFlg;
      this.$router.push({
        name: 'CareReceiverLogin'
      });
    },
    showNursingCareOfficeLoginPage() {
      this.setNursingCareOfficeFlg;
      this.$router.push({
        name: 'NursingCareOfficeLogin'
      });
    }
  }
}
</script>

<style scoped>
.app__ttl {
  text-align: center;
  margin-bottom: 20px;
  font-size: 36px;
  color: #1a237e;
}
.home-btn__box {
  width: 400px;
  margin: 50px auto 0;
  padding: 40px;
  background-color: #fff;
  border-radius: 6px;
}
.home__btn {
  display: inline-block;
  color: #fff;
  padding: 20px;
  margin-bottom: 20px;
  box-sizing: border-box;
  width: 100%;
}
.home__btn:last-child {
  margin-bottom: 0;
}
</style>