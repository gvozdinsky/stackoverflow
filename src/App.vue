<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
  a {
    &:link, &:visited, &:hover {
      text-decoration: none;
    }
    &.inherit {
      &:link, &:visited, &:hover {
        color: inherit;
      }
    }
  }
</style>
