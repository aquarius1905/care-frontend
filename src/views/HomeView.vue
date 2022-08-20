<template>
  <div id="home">
    <div class="home-btn-box box-shadow">
      <h1 class="ttl">Care</h1>
        <button class="btn home-btn" @click="showCareManagerLoginPage()">
        ケアマネージャーの方はこちら
        </button>
        <button class="btn home-btn" @click="showKeyPersonLoginPage()">
        被介護者、キーパーソンの方はこちら
        </button>
        <button class="btn home-btn" @click="showHomeCareServiceProviderLoginPage()">
        介護事業者の方はこちら
        </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async showCareManagerLoginPage() {
      await this.$store.dispatch('setCareManagerFlg');
      this.$router.push({
        name: 'CareManagerLogin'
      });
    },
    async showKeyPersonLoginPage() {
      await this.$store.dispatch('setKeyPersonFlg');
      this.$router.push({
        name: 'KeyPersonLogin'
      });
    },
    async showHomeCareServiceProviderLoginPage() {
      await this.$store.dispatch('setHomeCareServiceProviderFlg');
    }
  }
}
</script>
<style scoped>
.ttl {
  text-align: center;
  padding: 0;
  margin-bottom: 20px;
  font-size: 36px;
}
.home-btn-box {
  width: 400px;
  margin: 0 auto;
  padding: 40px;
  background-color: #fff;
  border-radius: 6px;
}
.home-btn {
  display: inline-block;
  color: #fff;
  background-color: #1A237E;
  font-size: 18px;
  padding: 20px;
  margin-bottom: 20px;
  box-sizing: border-box;
  width: 100%;
}
</style>