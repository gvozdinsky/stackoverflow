<template>
  <div>
    <h1>Questions <template v-if="tag">for [ {{ tag }} ]</template></h1>
    <QuestionList :questions="questions" />
  </div>
</template>

<script>
import QuestionList from '@/components/question/QuestionList'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'questions',
  components: {
    QuestionList
  },
  props: {
    tag: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState('questions', ['questions'])
  },
  methods: {
    ...mapActions('questions', ['getQuestions'])
  },
  mounted () {
    this.getQuestions({ tag: this.tag })
  }

}
</script>
