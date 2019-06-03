<template>
  <div>
    <h1>Questions <template v-if="tag">for [ {{ tag }} ]</template></h1>
    <QuestionList :questions="questions" />
  </div>
</template>

<script>
import QuestionList from '@/components/question/QuestionList'
import { mapState } from 'vuex'

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
    ...mapState('question', ['questions'])
  }
}
</script>
