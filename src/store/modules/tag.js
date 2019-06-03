import TagService from '@/services/TagService'

export const INITIAL_STATE = {
  tags: []
}

export const mutations = {
  setTags (state, payload) {
    state.tags = payload
  }
}

export const actions = {
  async getTags ({ commit }) {
    const { data } = await TagService.fetchAll()
    commit('setTags', data)
  }
}

export default {
  namespaced: true,
  state: INITIAL_STATE,
  actions,
  mutations
}
