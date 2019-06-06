import { USER_GET_ACTION } from '@/store/constants/actionTypes'
import UserService from '@/services/UserService'
import { USER_DETAIL_SET_MUTATION } from '@/store/constants/mutationTypes'

export const INITIAL_STATE = {
  user: {
    badge_counts: {
      bronze: 27,
      silver: 19,
      gold: 1
    },
    last_modified_date: 1557387808,
    last_access_date: 1557387604,
    reputation_change_year: 305,
    reputation_change_quarter: 120,
    reputation_change_month: 20,
    reputation_change_week: 10,
    reputation_change_day: 0,
    reputation: 2622,
    creation_date: 1391306323,
    user_type: 'registered',
    accept_rate: 50,
    location: 'Kochi, Kerala, India',
    website_url: '',
    profile_image: 'https://www.gravatar.com/avatar/843c15ce3c7df9c796af4f99be88d40d?s=128&d=identicon&r=PG&f=1',
    display_name: 'Victor',
    id: 3261825
  },
  userDetail: null
}

export const mutations = {
  [USER_DETAIL_SET_MUTATION] (state, payload) {
    state.userDetail = payload
  }
}

export const actions = {
  async [USER_GET_ACTION] ({ commit }, id) {
    const { data } = await UserService.fetchOne(id)
    commit(USER_DETAIL_SET_MUTATION, data)
  }
}

export default {
  state: INITIAL_STATE,
  actions,
  mutations
}
