<template>
  <fragment>
    <v-layout v-if="loading" align-center justify-center>
      <v-progress-circular size="80" color="primary" indeterminate />
    </v-layout>
    <slot v-if="!loading" />
  </fragment>
</template>

<script>
export default {
  name: 'Loader',
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>
