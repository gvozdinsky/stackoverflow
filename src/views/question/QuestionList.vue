<template>
  <v-container fluid>
    <h1 class="mb-4">Questions
      <template v-if="tag">
        for <v-chip small color="primary" label text-color="white">{{ tag }}</v-chip>
      </template>
    </h1>
    <v-card>
      <v-list three-line>
        <template v-for="(question, index) in questions">
          <v-list-tile :key="question.id">
            <v-list-tile-content>
              <v-list-tile-title class="mb-1 title">
                <router-link :to="{ name: 'question:detail', params: { id: question.id }}" v-html="question.title" />
              </v-list-tile-title>
              <v-list-tile-sub-title>
                <router-link v-for="tag in question.tags" :to="{ name: 'question:tagged', params: { tag } }">
                  <TagLabel>{{ tag }}</TagLabel>
                </router-link>
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider

            :key="index"
          />
        </template>
      </v-list>
      <div class="py-2 text-xs-center">
        <v-pagination :length="pages" v-model="currentPage" @input="goTo"/>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import TagLabel from '@/components/TagLabel'
import { mapState, mapGetters } from 'vuex'
import { QUESTIONS_GET_ACTION } from '@/store/constants/actionTypes'
import store from '@/store'
import { QUESTIONS_PAGES_GETTER } from '@/store/constants/getterTypes'

async function getQuestions(to, next) {
  const { tag = '' } = to.params
  const { page = 1 } = to.query
  await store.dispatch(QUESTIONS_GET_ACTION, {tag, page})
  next()
}

export default {
  name: 'questions',
  components: {
    TagLabel
  },
  props: {
    tag: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      currentPage: parseInt(this.$route.query.page || 1)
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
    }
  },
  async beforeRouteEnter (to, from, next) {
    await getQuestions(to, next)
  },
  async beforeRouteUpdate (to, from, next) {
    await getQuestions(to, next)
  }
}
</script>
