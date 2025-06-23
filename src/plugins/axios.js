import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Change this to match your Laravel URL
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
})
export default api
