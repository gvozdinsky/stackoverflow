<template>
  <v-container fluid>
    <h1 class="mb-4" v-html="question.title"></h1>
    <v-layout row mb-4>
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

    <v-flex xs6 class="mb-5">
      <form @submit.prevent="submit">
        <v-textarea solo name="answer" label="Your answer" v-model="answerText"/>
        <v-btn color="primary" large type="submit" :disabled="!answerText" :loading="answerAddLoading">
          Add answer
        </v-btn>
      </form>
    </v-flex>

    <h2 class="mb-2">Answers ({{ answers.length }}):</h2>
    <AnswerList :answers="answers" />

  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AnswerList from '@/components/answer/AnswerList'
import TagLabel from '@/components/TagLabel'
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
    TagLabel
  },
  data() {
    return {
      answerText: '',
      answerAddLoading: false
    }
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
      getAnswers: ANSWERS_FOR_QUESTION_GET_ACTION,
      addAnswer: ANSWER_ADD_ACTION
    }),
    async submit () {
      const { id, answerText } = this;
      console.log({id, answerText})
      this.answerAddLoading = true
      await this.addAnswer({ questionId: id, answer: { body: answerText }})
      this.answerAddLoading = false
      this.answerText = ''
    }
  },
  created() {
    const { id } = this
    this.getQuestion(id)
    this.getAnswers(id)
  }
}
</script>
