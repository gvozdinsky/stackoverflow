import AnswerService from '@/services/AnswerService'
import { ANSWER_ADD_MUTATION, ANSWER_SET_MUTATION, ANSWERS_SET_MUTATION } from '@/store/constants/mutationTypes'
import {
  ANSWER_ADD_ACTION,
  ANSWER_SCORE_UPDATE_ACTION,
  ANSWERS_FOR_QUESTION_GET_ACTION
} from '@/store/constants/actionTypes'
import Vue from 'vue'

export const INITIAL_STATE = {
  answers: []
}

export const mutations = {
  [ANSWERS_SET_MUTATION] (state, payload) {
    state.answers = payload
  },
  [ANSWER_ADD_MUTATION] (state, payload) {
    state.answers.push(payload)
  },
  [ANSWER_SET_MUTATION] (state, payload) {
    const index = state.answers.findIndex(answer => answer.id === payload.id)
    Vue.set(state.answers, index, payload)
  }
}

export const actions = {
  async [ANSWERS_FOR_QUESTION_GET_ACTION] ({ commit }, questionId) {
    const { data } = await AnswerService.fetchAllForQuestion(questionId)
    commit(ANSWERS_SET_MUTATION, data)
  },
  async [ANSWER_ADD_ACTION] ({ commit, rootState }, { questionId, answer }) {
    const { user } = rootState.user
    const now = parseInt(Date.now() / 1000)
    const { data } = await AnswerService.addAnswer(questionId, {
      ...answer,
      question_id: questionId,
      owner: {
        reputation: user.reputation,
        user_id: user.id,
        user_type: user.user_type,
        accept_rate: user.accept_rate,
        profile_image: user.profile_image,
        display_name: user.display_name
      },
      score: 0,
      is_accepted: false,
      creation_date: now,
      last_activity_date: now,
      last_edit_date: now
    })
    commit(ANSWER_ADD_MUTATION, data)
  },
  async [ANSWER_SCORE_UPDATE_ACTION] ({ commit }, { id, score }) {
    const { data } = await AnswerService.updateScore(id, score)
    commit(ANSWER_SET_MUTATION, data)
  }
}

export default {
  state: INITIAL_STATE,
  actions,
  mutations
}
