import serve from './serve'

const getCoin = function (current, size) {
    return serve.get('/find?current=' + current + "&size=" + size)
}


export {
    getCoin
}