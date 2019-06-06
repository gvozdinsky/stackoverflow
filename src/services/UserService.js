import httpCLient from './index'

const path = '/users'

export default {
  fetchOne (id) {
    return httpCLient.get(`${path}/${id}`)
  }
}
