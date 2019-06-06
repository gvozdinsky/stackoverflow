<template>
  <v-container fluid fill-height>
    <Loader :loading="loading">
      <v-layout column>

        <div>
          <h1 class="mb-4">Tags</h1>
        </div>

        <div>
          <v-text-field label="Search for tags" solo clearable v-model="searchText"/>
        </div>
<!--        <v-layout>-->
<!--          <v-flex xs3>-->
<!--            <v-text-field label="Search for tags" solo clearable v-model="searchText"/>-->
<!--          </v-flex>-->
<!--        </v-layout>-->


          <div>
            <v-card>
              <v-layout py-3 px-3 row wrap>
                <v-flex xs3 v-for="tag in filteredTags" :key="tag.name">
                  <router-link :to="{ name: 'question:tagged', params: { tag: tag.name}}">
                    <TagLabel> {{ tag.name }} </TagLabel>
                  </router-link>
                  <span> x {{ tag.count }}</span>
                </v-flex>
                <p v-show="!filteredTags.length">
                  There is no such tag
                </p>
              </v-layout>
            </v-card>
          </div>
        </v-layout>
    </Loader>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TagLabel from '@/components/TagLabel'
import Loader from '@/components/Loader'
import { TAGS_GET_ACTION } from '@/store/constants/actionTypes'

export default {
  name: 'tags',
  components: {
    TagLabel,
    Loader
  },
  data() {
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
  async created () {
    this.loading = true
    await this.getTags()
    this.loading = false
  }
}
</script>
