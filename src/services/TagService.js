import httpClient from './index'

const path = '/tags'

export default {
  fetchAll () {
    return httpClient.get(path)
  }
}
