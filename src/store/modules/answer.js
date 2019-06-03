import AnswerService from '@/services/AnswerService'
import { ANSWERS_SET_MUTATION } from '@/store/mutationTypes'
import { ANSWERS_FOR_QUESTION_GET_ACTION } from '@/store/actionTypes'

export const INITIAL_STATE = {
  answers: []
}

export const mutations = {
  [ANSWERS_SET_MUTATION] (state, payload) {
    state.answers = payload
  }
}

export const actions = {
  async [ANSWERS_FOR_QUESTION_GET_ACTION] ({ commit }, questionId) {
    const { data } = await AnswerService.fetchAllForQuestion(questionId)
    commit(ANSWERS_SET_MUTATION, data)
  }
}

export default {
  state: INITIAL_STATE,
  actions,
  mutations
}
