import httpClient from './index'

const path = '/answers'

export default {
  fetchAllForQuestion (questionId) {
    return httpClient.get(`${path}?question_id=${questionId}`)
  },
  addAnswer (questionId, data) {
    return httpClient.post(`${path}`, data)
  }
}
