<template>
  <div id="app">
    <div class="header">
      <SideBar></SideBar>
      <CommonHeader></CommonHeader>
    </div>
    <router-view />
  </div>
</template>

<script>
import CommonHeader from "./components/CommonHeader";
import SideBar from "./components/SideBar";
export default {
  components: { CommonHeader, SideBar }
};
</script>

<style>
@import "./css/reset.css";
@import "./css/common.css";

.header {
  display: flex;
}
</style>
