<template>
  <div>
    <pre>{{ question }}</pre>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'question-detail',
  props: {
    id: {
      required: true
    }
  },
  methods: {
    ...mapActions('questions', ['getQuestion'])
  },
  computed: {
    ...mapState('questions', ['question'])
  },
  mounted () {
    this.getQuestion(this.id)
  }
}
</script>
