<template>
  <div>
    <div v-for="answer in answers"
         :key="answer.id"
         v-html="answer.body"
         :class="{ accepted: answer.is_accepted }"
         class="answer"
    >
    </div>>
  </div>
</template>

<script>
export default {
  props: {
    answers: {
      required: true,
      type: Array
    }
  }
}
</script>

<style lang="scss">
  .answer {
    padding: 10px 15px;
    background-color: #f4f4f4;
    margin-bottom: 30px;

    &.accepted {
      background-color: #ecfbec;
    }
  }
</style>
