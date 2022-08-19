<template>
  <div>
    <CompletionMessage :msg="msg"></CompletionMessage>
  </div>
</template>

<script>
import CompletionMessage from "@/components/CompletionMessage";
export default {
  components: { CompletionMessage },
  data: function () {
    return {
      msg: "ケアマネージャー登録情報の更新が完了しました"
    }
  }
};
</script>