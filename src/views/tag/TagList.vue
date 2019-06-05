<template>
  <v-container fluid>
    <h1 class="mb-4">Tags</h1>
    <v-layout row>
      <v-flex xs3 >
        <v-text-field label="Search for tags" solo clearable v-model="searchText"/>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex grow>
        <v-card>
          <v-layout py-3 px-3 row wrap>
            <v-flex xs3 v-for="tag in filteredTags" :key="tag.name">
              <router-link :to="{ name: 'question:tagged', params: { tag: tag.name}}">
                <TagLabel> {{ tag.name }} </TagLabel>
              </router-link>
              <span> x {{ tag.count }}</span>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TagLabel from '@/components/TagLabel'
import { TAGS_GET_ACTION } from '@/store/constants/actionTypes'

export default {
  name: 'tags',
  components: {
    TagLabel
  },
  data() {
    return {
      searchText: null
    }
  },
  computed: {
    ...mapState({
      tags: state => state.tag.tags
    }),
    filteredTags () {
      if(this.searchText === '' || this.searchText === null) {
        return this.tags
      }
      return this.tags.filter(tag => tag.name.startsWith(this.searchText))
    }
  },
  methods: {
    ...mapActions({
      getTags: TAGS_GET_ACTION
    })
  },
  created() {
    this.getTags()
  }
}
</script>
