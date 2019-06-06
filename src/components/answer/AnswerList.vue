<template>
  <v-layout column>
    <v-card
      v-for="answer in answers"
      :key="answer.id"
      :class="{ 'light-green lighten-3': answer.is_accepted }"
      class="mb-3 py-3"
    >
      <v-layout>
        <v-flex align-self-start xs1>
          <Vote @vote="val => vote(answer.id, val + answer.score)">
            {{ answer.score }}
          </Vote>
        </v-flex>
        <v-flex xs11>
          <v-layout column>
            <v-flex class="mb-3">
              <v-layout>
                <v-avatar class="mr-2">
                  <v-img :src="answer.owner.profile_image" />
                </v-avatar>
                <div>
                  <v-flex>
                    <router-link :to="{ name: 'user:detail', params: { id: answer.owner.user_id }}">
                      {{ answer.owner.display_name }}
                    </router-link>
                    <b>({{ answer.owner.reputation }})</b>
                  </v-flex>
                  <v-flex>
                    answered {{ new Date(answer.creation_date * 1000).toLocaleString() }}
                  </v-flex>
                </div>
              </v-layout>
            </v-flex>
            <v-card-text>
              <div v-html="answer.body" />
            </v-card-text>
          </v-layout>
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
  computed: {
    createdAt () {
      return
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
