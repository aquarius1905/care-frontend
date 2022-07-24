<template>
  <div id="app">
    <SideBar></SideBar>
    <router-view class="router-view" />
  </div>
</template>

<script>
import SideBar from "./components/SideBar";
export default {
  components: { SideBar }
};
</script>

<style>
@import "./css/reset.css";
@import "./css/common.css";

#app {
  display: flex;
}
.router-view {
  width: 100%;
  margin: 52px 0 0 auto;
}
</style>
