import serve from './serve'

const getCoin = function () {
    return serve.get('/mycoin')
}


export {
    getCoin
}