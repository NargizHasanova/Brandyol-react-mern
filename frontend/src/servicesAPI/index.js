import axios from 'axios';

const Axios = axios.create({
    baseURL: "http://localhost:4444"
})

Axios.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token')
    return config
})

export { Axios }