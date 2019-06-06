import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'
const httpClient = axios.create({
  headers: {
    'Content-Type': 'application/json'
  }
})

export default httpClient
