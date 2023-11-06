import serve from './serve'

const getCoin = function (page, query) {
    const { current, size } = page
    return serve({ url: '/find?current=' + current + "&size=" + size, method: 'get', params: query })
}

const propertyUrl = '/property'
const getProperty = function () {
    return serve({ url: propertyUrl + '/list', method: 'get' })
}

export {
    getCoin,
    getProperty
}