import AnswerService from '@/services/AnswerService'
import { ANSWER_ADD_MUTATION, ANSWERS_SET_MUTATION } from '@/store/constants/mutationTypes'
import { ANSWER_ADD_ACTION, ANSWERS_FOR_QUESTION_GET_ACTION } from '@/store/constants/actionTypes'

export const INITIAL_STATE = {
  answers: []
}

export const mutations = {
  [ANSWERS_SET_MUTATION] (state, payload) {
    state.answers = payload
  },
  [ANSWER_ADD_MUTATION] (state, payload) {
    state.answers.push(payload)
  }
}

export const actions = {
  async [ANSWERS_FOR_QUESTION_GET_ACTION] ({ commit }, questionId) {
    const { data } = await AnswerService.fetchAllForQuestion(questionId)
    commit(ANSWERS_SET_MUTATION, data)
  },
  async [ANSWER_ADD_ACTION] ({ commit, rootState }, { questionId, answer }) {
    const { user } = rootState.user
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
      }
    })
    commit(ANSWER_ADD_MUTATION, data)
  }
}

export default {
  state: INITIAL_STATE,
  actions,
  mutations
}
