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
      msg: "登録が完了しました\n\nご登録頂いたメールアドレス宛てに\nメールを送信しましたので\n認証をお願い致します"
    }
  }
};
</script>