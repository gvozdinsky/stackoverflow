import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'
const httpClient = axios.create()

export default httpClient
