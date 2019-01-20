import axios from 'axios'

export default axios.create({
    baseURL: '/api/',
    headers: { auth_token: localStorage.getItem('auth_token') },
})
