import QuestionService from '@/services/QuestionService'
import { QUESTION_SET_MUTATION, QUESTIONS_SET_MUTATION } from '@/store/mutationTypes'
import { QUESTION_GET_ACTION, QUESTIONS_GET_ACTION } from '@/store/actionTypes'

export const INITIAL_STATE = {
  questions: [],
  question: {}
}

export const mutations = {
  [QUESTIONS_SET_MUTATION] (state, payload) {
    state.questions = payload
  },
  [QUESTION_SET_MUTATION] (state, payload) {
    state.question = payload
  }
}

export const actions = {
  async [QUESTIONS_GET_ACTION] ({ commit }, filter = { tag: '' }) {
    const { data } = await QuestionService.fetchAll(filter.tag)
    commit(QUESTIONS_SET_MUTATION, data)
  },
  async [QUESTION_GET_ACTION] ({ commit }, id) {
    const { data } = await QuestionService.fetchOne(id)
    commit(QUESTION_SET_MUTATION, data)
  }
}

export default {
  state: INITIAL_STATE,
  actions,
  mutations
}
