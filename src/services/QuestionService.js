import httpClient from './index'

const path = '/questions'

export default {
  fetchAll (tag = '', perPage = 10, page = 1) {
    return httpClient.get(`${path}?tags_like=${tag}&_limit=${perPage}&_page=${page}`)
  },

  fetchOne (id) {
    return httpClient.get(`${path}/${id}`)
  },
  updateScore (id, score) {
    return httpClient.patch(`${path}/${id}`, { score })
  }
}
