import axios from 'axios';

const Axios = axios.create({
    baseURL: "http://localhost:4444"
})

Axios.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token')
    // nastroy headers.Authorization = token ve bakende otur
    return config
})

export { Axios }