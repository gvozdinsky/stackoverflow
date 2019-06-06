<template>
  <v-layout column>
    <v-card
      v-for="answer in answers"
      :key="answer.id"
      :class="{ 'light-green lighten-3': answer.is_accepted }"
      class="mb-3 py-3 px-3"
    >
      <v-layout>
        <v-flex align-self-center xs1 class="mr-5">
          <Vote @vote-up="val => vote(answer.id, val + answer.score)"
                @vote-down="val => vote(answer.id, val + answer.score)">
            {{ answer.score }}
          </Vote>
        </v-flex>
        <v-flex xs 11 v-html="answer.body">
        </v-flex>
      </v-layout>
    </v-card>
  </v-layout>
</template>

<script>
import Vote from '@/components/Vote'
import { mapActions } from 'vuex'
import { ANSWER_SCORE_UPDATE_ACTION } from '@/store/constants/actionTypes'

export default {
  name: 'answer-list',
  components: {
    Vote
  },
  props: {
    answers: {
      required: true,
      type: Array
    }
  },
  methods: {
    ...mapActions({
      updateScore: ANSWER_SCORE_UPDATE_ACTION
    }),
    vote (id, score) {
      this.updateScore({ id, score })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
