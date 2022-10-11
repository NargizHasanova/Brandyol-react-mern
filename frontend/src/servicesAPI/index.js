import axios from 'axios';

const Axios = axios.create({
    baseURL: "http://localhost:4444"
})

export { Axios }