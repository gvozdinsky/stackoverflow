<template>
  <div class="center">
    <h1>404</h1>
    <h2>The {{ resource }} you're looking for is not here</h2>
  </div>
</template>

<script>
export default {
  props: {
    resource: {
      type: String,
      default: 'page'
    }
  }
}
</script>

<style>
  .center {
    text-align: center;
  }
</style>
