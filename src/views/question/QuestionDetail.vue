<template>
  <div>
    <h1> {{ question. title }}</h1>
    <pre>{{ question }}</pre>
    <div>
      <h2>Answers:</h2>
      <AnswerList :answers="answers" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AnswerList from '@/components/answer/AnswerList'
export default {
  name: 'question-detail',
  props: {
    id: {
      required: true
    }
  },
  components: {
    AnswerList
  },
  methods: {
    ...mapActions('questions', ['getQuestion']),
    ...mapActions('answers', ['getAnswersForQuestion'])
  },
  computed: {
    ...mapState('questions', ['question']),
    ...mapState('answers', ['answers'])
  },
  mounted () {
    this.getQuestion(this.id)
    this.getAnswersForQuestion(this.id)
  }
}
</script>
