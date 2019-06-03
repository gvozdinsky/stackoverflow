<template>
  <div>
    <h1>Tags:</h1>
    <TagList :tags="tags" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TagList from '@/components/tag/TagList'

export default {
  name: 'tags',
  components: {
    TagList
  },
  computed: {
    ...mapState('tag', ['tags'])
  }
}
</script>
