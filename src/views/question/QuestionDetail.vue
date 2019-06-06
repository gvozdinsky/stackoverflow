<template>
  <v-container fluid fill-height>
    <Loader :loading="loaders.question && loaders.answers">
      <v-layout column>
        <h1 class="mb-4" v-html="title" />
        <v-layout row mb-4>
          <v-flex grow>
            <v-card>
              <v-layout>
                <v-flex xs1 align-self-start class="mt-3">
                  <Vote @vote="value => vote(question.id, score + value )">
                    {{ score }}
                  </Vote>
                </v-flex>
                <v-flex xs11>
                  <v-card-title>
                    <v-avatar class="mr-2">
                      <v-img :src="owner.profile_image" />
                    </v-avatar>
                    <v-layout column>
                      <v-flex>
                        <router-link :to="{ name: 'user:detail', params: { id: owner.user_id }}">
                          {{ owner.display_name }}
                        </router-link>
                        <b>({{ owner.reputation }})</b>
                      </v-flex>
                      <v-flex>
                        asked {{ createdAt }}
                      </v-flex>
                    </v-layout>
                  </v-card-title>
                  <v-card-text>
                    <div v-html="body" />
                  </v-card-text>
                  <div class="pa-2">
                    <TagLabel v-for="tag in tags" :key="tag" :to="{ name: 'question:tagged', params: { tag }}">
                      {{ tag }}
                    </TagLabel>
                  </div>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
        <v-flex xs6 class="mb-5">
          <form @submit.prevent="submit">
            <v-textarea v-model="answerText" solo name="answer" label="Your answer" />
            <v-btn color="primary" large type="submit" :disabled="!answerText" :loading="loaders.answerAdd">
              Add answer
            </v-btn>
          </form>
        </v-flex>
        <h2 class="mb-2">
          Answers ({{ answers.length }}):
        </h2>
        <AnswerList :answers="answers" />
      </v-layout>
    </Loader>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AnswerList from '@/components/answer/AnswerList'
import TagLabel from '@/components/TagLabel'
import Loader from '@/components/Loader'
import Vote from '@/components/Vote'
import {
  ANSWER_ADD_ACTION,
  ANSWERS_FOR_QUESTION_GET_ACTION,
  QUESTION_GET_ACTION,
  QUESTION_SCORE_UPDATE_ACTION
} from '@/store/constants/actionTypes'

export default {
  name: 'QuestionDetail',
  components: {
    AnswerList,
    TagLabel,
    Loader,
    Vote
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      answerText: '',
      loaders: {
        answerAdd: false,
        answers: false,
        question: false
      }
    }
  },
  computed: {
    ...mapState({
      question: state => state.question.question,
      answers: state => state.answer.answers
    }),
    title () {
      return this.question?.title
    },
    body () {
      return this.question?.body
    },
    tags () {
      return this.question.tags
    },
    owner () {
      return this.question?.owner || {}
    },
    createdAt () {
      return new Date(this.question?.creation_date * 1000).toLocaleString()
    },
    score () {
      return this.question?.score
    }
  },
  async created () {
    const { id } = this
    this.loaders.question = true
    this.loaders.answers = true
    await Promise.all([
      this.getQuestion(id),
      this.getAnswers(id)
    ])
    this.loaders.question = false
    this.loaders.answers = false
  },
  methods: {
    ...mapActions({
      getQuestion: QUESTION_GET_ACTION,
      getAnswers: ANSWERS_FOR_QUESTION_GET_ACTION,
      addAnswer: ANSWER_ADD_ACTION,
      updateQuestionScore: QUESTION_SCORE_UPDATE_ACTION
    }),
    async submit () {
      const { id, answerText } = this
      this.loaders.answerAdd = true
      await this.addAnswer({ questionId: id, answer: { body: answerText } })
      this.loaders.answerAdd = false
      this.answerText = ''
    },
    vote (id, score) {
      this.updateQuestionScore({ id, score })
    }
  }
}
</script>
