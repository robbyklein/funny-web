import axios from 'axios'

export default axios.create({
    baseURL: '/api/',
    headers: { auth: localStorage.getItem('auth') },
})
