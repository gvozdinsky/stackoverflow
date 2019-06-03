<template>
  <div>
    <h1>Tags:</h1>
    <TagList :tags="tags" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TagList from '@/components/tag/TagList'

export default {
  name: 'tags',
  components: {
    TagList
  },
  computed: {
    ...mapState('tags', ['tags'])
  },
  methods: {
    ...mapActions('tags', ['getTags'])
  },
  mounted () {
    this.getTags()
  }
}
</script>
