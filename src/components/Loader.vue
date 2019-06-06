<template>
  <fragment>
    <v-layout align-center justify-center v-if="loading">
      <v-progress-circular size="80" color="primary" indeterminate />
    </v-layout>
    <slot v-if="!loading"></slot>
  </fragment>
</template>

<script>
export default {
  name: 'loader',
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>
