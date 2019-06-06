<template>
  <v-container fluid fill-height>
    <v-layout column>
      <h1 class="mb-4">Questions
        <template v-if="tag">
          for <v-chip small color="primary"
                      label
                      text-color="white"
                      close
                      @input="removeFilter"
                      v-model="tagFilter"
        >{{ tag }}</v-chip>
        </template>
      </h1>
      <v-card class="grow">
        <v-layout column fill-height>
          <Loader :loading="loading">
            <v-list three-line>
              <template v-for="(question, index) in questions">
                <v-list-tile :key="question.id">
                  <v-list-tile-content>
                    <v-list-tile-title class="mb-1 title">
                      <router-link :to="{ name: 'question:detail', params: { id: question.id }}" v-html="question.title" />
                    </v-list-tile-title>
                    <v-list-tile-sub-title>
                        <TagLabel v-for="tag in question.tags" :to="{ name: 'question:tagged', params: { tag } }">
                          {{ tag }}
                        </TagLabel>
                    </v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider
                  v-if="questions.length - 1 "
                  :key="index"
                />
              </template>
            </v-list>
            <div class="py-2 text-xs-center" v-show="pages > 1">
              <v-pagination :length="pages" v-model="currentPage" @input="goTo"/>
            </div>
          </Loader>
        </v-layout>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import TagLabel from '@/components/TagLabel'
import Loader from '@/components/Loader'
import { mapState, mapGetters, mapActions } from 'vuex'
import { QUESTIONS_GET_ACTION } from '@/store/constants/actionTypes'
import { QUESTIONS_PAGES_GETTER } from '@/store/constants/getterTypes'

export default {
  name: 'questions',
  components: {
    TagLabel,
    Loader
  },
  props: {
    tag: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      currentPage: parseInt(this.$route.query.page || 1),
      loading: false,
      tagFilter: true
    }
  },
  computed: {
    ...mapState({
      questions: state => state.question.questions,
    }),
    ...mapGetters({
      pages: QUESTIONS_PAGES_GETTER
    })
  },
  methods: {
    goTo (page) {
      this.$router.push({ name: 'question:list', query: { page }})
    },
    removeFilter() {
      this.$router.push({ name: 'question:list' })
      this.tagFilter = true
    },
    ...mapActions({
      fetchQuestions: QUESTIONS_GET_ACTION
    }),
    async getQuestions () {
      const { tag } = this.$route.params;
      const { page } = this.$route.query
      this.loading = true
      await this.fetchQuestions({ tag, page })
      this.loading = false
    }
  },

  async created () {
    await this.getQuestions(this.$route)
  },

  watch: {
    async $route (newRoute) {
      await this.getQuestions(newRoute)
    }
  }
}
</script>
