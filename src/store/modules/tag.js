import TagService from '@/services/TagService'
import { TAGS_SET_MUTATION } from '@/store/constants/mutationTypes'
import { TAGS_GET_ACTION } from '@/store/constants/actionTypes'

export const INITIAL_STATE = {
  tags: []
}

export const mutations = {
  [TAGS_SET_MUTATION] (state, payload) {
    state.tags = payload
  }
}

export const actions = {
  async [TAGS_GET_ACTION] ({ commit }) {
    const { data } = await TagService.fetchAll()
    commit(TAGS_SET_MUTATION, data)
  }
}

export default {
  state: INITIAL_STATE,
  actions,
  mutations
}
