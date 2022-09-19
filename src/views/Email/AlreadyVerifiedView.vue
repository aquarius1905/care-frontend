<template>
  <div>
    <TextMessage :msg="msg"></TextMessage>
  </div>
</template>

<script>
import TextMessage from "@/components/TextMessage";
export default {
  components: { TextMessage },
  data: function () {
    return {
      msg: "既にメール認証されています"
    }
  }
};
</script>