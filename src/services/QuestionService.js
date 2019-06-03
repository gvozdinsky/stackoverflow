import httpClient from './index'

const path = '/questions'

export default {
  fetchAll (tag) {
    const finalPath = tag ? `${path}?tags_like=${tag}` : path
    return httpClient.get(finalPath)
  },

  fetchOne (id) {
    return httpClient.get(`${path}/${id}`)
  }
}
