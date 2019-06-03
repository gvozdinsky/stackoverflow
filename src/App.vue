<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'home' }" exact>Home</router-link> |
      <router-link :to="{ name: 'question:list' }">Questions</router-link> |
      <router-link :to="{ name: 'tag:list' }">Tags</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
a {
  &:link, &:visited {
    color: #42b983
  }
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-active {
      color: #42b983;
    }
  }
}
</style>
