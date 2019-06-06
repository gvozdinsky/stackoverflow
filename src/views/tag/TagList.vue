<template>
  <v-container fluid fill-height>
    <v-layout column>
      <div>
        <h1 class="mb-4">
          Tags
        </h1>
      </div>
      <div>
        <v-text-field v-model="searchText" label="Search for tags" solo clearable />
      </div>
      <v-card class="grow">
        <v-layout py-3 px-3 row wrap fill-height>
          <Loader :loading="loading">
            <v-flex v-for="tag in filteredTags" :key="tag.name" xs3>
              <TagLabel :to="{ name: 'question:tagged', params: { tag: tag.name}}">
                {{ tag.name }}
              </TagLabel>
              <span> x {{ tag.count }}</span>
            </v-flex>
            <p v-show="!filteredTags.length">
              There is no such tag
            </p>
          </Loader>
        </v-layout>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TagLabel from '@/components/TagLabel'
import Loader from '@/components/Loader'
import { TAGS_GET_ACTION } from '@/store/constants/actionTypes'

export default {
  name: 'Tags',
  components: {
    TagLabel,
    Loader
  },
  data () {
    return {
      searchText: null,
      loading: false
    }
  },
  computed: {
    ...mapState({
      tags: state => state.tag.tags
    }),
    filteredTags () {
      if (this.searchText === '' || this.searchText === null) {
        return this.tags
      }
      return this.tags.filter(tag => tag.name.startsWith(this.searchText))
    }
  },
  async created () {
    this.loading = true
    await this.getTags()
    this.loading = false
  },
  methods: {
    ...mapActions({
      getTags: TAGS_GET_ACTION
    })
  }
}
</script>
