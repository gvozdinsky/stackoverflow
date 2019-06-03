<template>
  <ol>
    <li v-for="question in questions" :key="question.id">
      <router-link :to="{ name: 'question:detail', params: { id: question.id}}" v-html="question.title"></router-link>
    </li>
  </ol>
</template>

<script>
export default {
  props: {
    questions: {
      required: true,
      type: Array
    }
  }
}
</script>
