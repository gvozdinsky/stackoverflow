<template>
  <v-container fluid>
    <h1 class="mb-4" v-html="question.title"></h1>
    <v-layout row mb-3>
      <v-flex grow>
        <v-card>
          <v-card-title>
            <v-avatar class="mr-2">
              <v-img :src="question.owner.profile_image" />
            </v-avatar>

            <v-layout column>
              <v-flex>
                <router-link :to="'/user/1'">
                  {{ question.owner.display_name }}
                </router-link>
                <b>({{ question.owner.reputation }})</b>
              </v-flex>

              <v-flex>
                asked {{ createdAt }}
              </v-flex>
            </v-layout>

          </v-card-title>
          <v-card-text>
            <div v-html="question.body" />
          </v-card-text>

          <div class="pa-2">
            <TagLabel v-for="tag in  question.tags" >
              {{ tag }}
            </TagLabel>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
    <div>
      <h2>Answers:</h2>
      <AnswerList :answers="answers" />
    </div>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AnswerList from '@/components/answer/AnswerList'
import TagLabel from '@/components/TagLabel'
import { ANSWERS_FOR_QUESTION_GET_ACTION, QUESTION_GET_ACTION } from '@/store/constants/actionTypes'
export default {
  name: 'question-detail',
  components: {
    AnswerList,
    TagLabel
  },
  computed: {
    ...mapState({
      question: state => state.question.question,
      answers: state => state.answer.answers
    }),
    createdAt() {
      return new Date(this.question.creation_date * 1000).toLocaleString()
    }
  },
  methods: {
    ...mapActions({
      getQuestion: QUESTION_GET_ACTION,
      getAnswers: ANSWERS_FOR_QUESTION_GET_ACTION
    })
  },
  created() {
    const { id } = this.$route.params
    this.getQuestion(id)
    this.getAnswers(id);
  }
}
</script>
