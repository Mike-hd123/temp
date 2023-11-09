import serve from './serve'

const getCoin = function (page, query) {
    const { current, size } = page
    return serve({ url: '/find?current=' + current + "&size=" + size, method: 'get', params: query })
}

const propertyUrl = '/property'
const getProperty = function () {
    return serve({ url: propertyUrl + '/list', method: 'get' })
}

const addProperty = function (data) {
    return serve({ url: propertyUrl + '/add', method: 'post', data: data })
}

const editProperty = function (data) {
    return serve({ url: propertyUrl + '/update', method: 'post', data: data })
}

const delProperty = function (id) {
    return serve({ url: propertyUrl + '/delete', method: 'get', params: { id: id } })
}

export {
    getCoin,
    getProperty,
    addProperty,
    editProperty,
    delProperty
}