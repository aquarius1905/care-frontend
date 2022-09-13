<template>
  <div id="app">
    <Header v-show="isShow"></Header>
    <div class="flex">
      <SideBar v-show="isShow"></SideBar>
      <main class="main">
        <router-view/>
      </main>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import Footer from "./components/Footer";
export default {
  components: { Header, SideBar, Footer },
  computed: {
    isShow: function () {
      return this.$route.path !== '/';
    }
  }
};
</script>

<style>
@import "./css/reset.css";
@import "./css/common.css";

#app {
  overflow: hidden;
}
.main {
  overflow-y: scroll;
  width: 100%;
  height: calc(100vh - 60px);
}
</style>