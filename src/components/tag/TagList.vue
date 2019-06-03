<template>
  <ol>
    <li v-for="tag in tags" :key="tag.name">
        <router-link :to="{ name: 'question:tagged', params: { tag: tag.name}}">
          {{ tag.name }} [ {{ tag.count }} ]
        </router-link>
      </li>
  </ol>
</template>

<script>
export default {
  props: {
    tags: {
      required: true,
      type: Array
    }
  }
}
</script>

