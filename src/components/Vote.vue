<template>
  <div class="text-xs-center">
    <div class="vote-btn display-1 mb-3 grey--text text--darken-1" @click="$emit('vote', 1)">
      &#x25b2;
    </div>
    <div class="title mb-3">
      <slot />
    </div>
    <div class="vote-btn display-1 grey--text text--darken-1" @click="$emit('vote', -1)">
      &#x25bc;
    </div>
  </div>
</template>

<script>
export default {
  name: 'Vote'
}
</script>

<style lang="scss">
  .vote-btn {
  &:hover {
     cursor: pointer;
   }
  }
</style>
