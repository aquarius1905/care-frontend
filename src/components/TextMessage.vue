<template>
  <div id="txt-msg">
    <div class="msg-box box-shadow">
      <p class="msg">{{ msg }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    msg: {
      type: String
    }
  }
};
</script>

<style>
.txt-msg {
  white-space: pre-wrap;
}
</style>