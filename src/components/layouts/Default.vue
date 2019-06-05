<template>
  <v-app>
    <v-toolbar dark>
      <v-toolbar-title>
        <router-link flat :to="{ name: 'home' }" class="white--text">
          <span class="font-weight-regular">stack </span>
          <span class="font-weight-bold">overflow</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat :to="{ name: 'question:list' }">Questions</v-btn>
        <v-btn flat :to="{ name: 'tag:list' }">Tags</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout>
          <v-flex grow  >
            <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>
