const baseUrl = 'http://localhost:3000'

const getPath = path => baseUrl + path

const get = path => fetch(getPath(path)).then(res => res.json)

export const clientApi = {
  list: () => get('/customers'),
}
