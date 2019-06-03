import AnswerService from '@/services/AnswerService'

export const INITIAL_STATE = {
  answers: []
}

export const mutations = {
  setAnswers (state, payload) {
    state.answers = payload
  }
}

export const actions = {
  async getAnswersForQuestion ({ commit }, questionId) {
    const { data } = await AnswerService.fetchAllForQuestion(questionId)
    commit('setAnswers', data)
  }
}

export default {
  namespaced: true,
  state: INITIAL_STATE,
  actions,
  mutations
}
