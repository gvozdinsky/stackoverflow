<template>
  <v-container fluid fill-height>
    <Loader :loading="loaders.question && loaders.answers">
      <v-layout column>
        <h1 class="mb-4" v-html="q.title"></h1>
        <v-layout row mb-4>
          <v-flex grow>
            <v-card>
              <v-card-title>
                <v-avatar class="mr-2">
                  <v-img :src="q.ownerProfileImage" />
                </v-avatar>

                <v-layout column>
                  <v-flex>
                    <router-link :to="'/user/1'">
                      {{ q.ownerName }}
                    </router-link>
                    <b>({{ q.ownerReputation }})</b>
                  </v-flex>

                  <v-flex>
                    asked {{ q.createdAt }}
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

        <v-flex xs6 class="mb-5">
          <form @submit.prevent="submit">
            <v-textarea solo name="answer" label="Your answer" v-model="answerText"/>
            <v-btn color="primary" large type="submit" :disabled="!answerText" :loading="loaders.answerAdd">
              Add answer
            </v-btn>
          </form>
        </v-flex>

        <h2 class="mb-2">Answers ({{ answers.length }}):</h2>
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
import { ANSWER_ADD_ACTION, ANSWERS_FOR_QUESTION_GET_ACTION, QUESTION_GET_ACTION } from '@/store/constants/actionTypes'

export default {
  name: 'question-detail',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  components: {
    AnswerList,
    TagLabel,
    Loader
  },
  data() {
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
    q() {
      const { question } = this
      return {
        title: question?.title,
        ownerProfileImage: question?.owner?.profile_image,
        ownerName: question?.owner?.display_name,
        ownerReputation: question?.owner?.reputation,
        createdAt: new Date(this.question?.creation_date * 1000).toLocaleString()
      }
    }
  },
  methods: {
    ...mapActions({
      getQuestion: QUESTION_GET_ACTION,
      getAnswers: ANSWERS_FOR_QUESTION_GET_ACTION,
      addAnswer: ANSWER_ADD_ACTION
    }),
    async submit () {
      const { id, answerText } = this;
      console.log({id, answerText})
      this.loaders.answerAdd = true
      await this.addAnswer({ questionId: id, answer: { body: answerText }})
      this.loaders.answerAdd = false
      this.answerText = ''
    }
  },
  async created() {
    const { id } = this
    this.loaders.question = true
    this.loaders.answers = true
    await Promise.all([
      this.getQuestion(id),
      this.getAnswers(id)
    ])
    this.loaders.question = false
    this.loaders.answers = false
  }
}
</script>
