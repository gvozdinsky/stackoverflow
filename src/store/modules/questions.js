import QuestionService from '@/services/QuestionService'

export const INITIAL_STATE = {
  questions: [],
  question: {}
}

export const mutations = {
  setQuestions (state, payload) {
    state.questions = payload
  },
  setQuestion (state, payload) {
    state.question = payload
  }
}

export const actions = {
  async getQuestions ({ commit }, filter = { tag: '' }) {
    const { data } = await QuestionService.fetchAll(filter.tag)
    commit('setQuestions', data)
  },
  async getQuestion ({ commit }, id) {
    const { data } = await QuestionService.fetchOne(id)
    commit('setQuestion', data)
  }
}

export default {
  namespaced: true,
  state: INITIAL_STATE,
  actions,
  mutations
}
