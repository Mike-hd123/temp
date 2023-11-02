import axios from 'axios'

const serve = axios.create({
    timeout: 20000,
    baseURL: 'api'
})

export default serve