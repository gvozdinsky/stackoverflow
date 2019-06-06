<template>
  <fragment>
    <template v-if="to">
      <router-link :to="to" class="d-inline-block link">
        <v-chip color="primary" text-color="white" small label>
          <slot />
        </v-chip>
      </router-link>
    </template>
    <template v-else>
      <v-chip color="primary" text-color="white" small label>
        <slot />
      </v-chip>
    </template>
  </fragment>
</template>

<script>
export default {
  name: 'TagLabel',
  props: {
    to: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped lang="scss">
  .link {
    &:hover {
      cursor: pointer;
    }
    &:link {
      color: white;
    }
  }
</style>
