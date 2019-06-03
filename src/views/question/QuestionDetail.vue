<template>
  <div>
    <h1> {{ question.title }}</h1>
    <pre>{{ question }}</pre>
    <div>
      <h2>Answers:</h2>
      <AnswerList :answers="answers" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AnswerList from '@/components/answer/AnswerList'
export default {
  name: 'question-detail',
  components: {
    AnswerList
  },
  computed: {
    ...mapState('question', ['question']),
    ...mapState('answer', ['answers'])
  }
}
</script>
