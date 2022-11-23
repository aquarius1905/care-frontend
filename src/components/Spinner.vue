<template>
  <div class="spinner">
    <VueSimpleSpinner size="40" line-bg-color="#eee" line-fg-color="#1a237e">
    </VueSimpleSpinner>
  </div>
</template>

<script>
import VueSimpleSpinner from 'vue-simple-spinner'
export default {
  components: { VueSimpleSpinner }
}
</script>

<style scoped>
.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 100000;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(85, 85, 85, .5);
}
</style>