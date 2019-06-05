import QuestionService from '@/services/QuestionService'
import { QUESTION_SET_MUTATION, QUESTIONS_SET_MUTATION, QUESTIONS_SET_TOTAL_MUTATION } from '@/store/constants/mutationTypes'
import { QUESTION_GET_ACTION, QUESTIONS_GET_ACTION } from '@/store/constants/actionTypes'
import { QUESTIONS_PAGES_GETTER } from '@/store/constants/getterTypes'

export const INITIAL_STATE = {
  questions: [],
  question: {},
  perPage: 10,
  total: 0
}

export const mutations = {
  [QUESTIONS_SET_MUTATION] (state, payload) {
    state.questions = payload
  },
  [QUESTIONS_SET_TOTAL_MUTATION] (state, payload) {
    state.total = payload
  },
  [QUESTION_SET_MUTATION] (state, payload) {
    state.question = payload
  }
}

export const actions = {
  async [QUESTIONS_GET_ACTION] ({ commit, state }, filter = { tag: '', page: 1 }) {
    const { tag, page } = filter
    const { data, headers } = await QuestionService.fetchAll(tag, state.perPage, page)
    commit(QUESTIONS_SET_MUTATION, data)
    commit(QUESTIONS_SET_TOTAL_MUTATION, parseInt(headers['x-total-count']))
  },
  async [QUESTION_GET_ACTION] ({ commit }, id) {
    const { data } = await QuestionService.fetchOne(id)
    commit(QUESTION_SET_MUTATION, data)
  }
}

export const getters = {
  [QUESTIONS_PAGES_GETTER]: state => {
    const { total, perPage } = state
    return total / perPage
  }
}

export default {
  state: INITIAL_STATE,
  actions,
  mutations,
  getters
}
