<template>
  <v-chip color="primary" text-color="white" small label class="tag-label">
    <slot></slot>
  </v-chip>
</template>

<script>
export default {
  name: 'tag-label'
}
</script>

<style scoped lang="scss">
  .tag-label:hover {
    cursor: pointer;
  }
</style>
