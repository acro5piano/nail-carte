import axios from 'axios'

const baseUrl = 'https://api.fastestnews.org'

const getPath = path => baseUrl + path

const GET = (path: string) => axios.get(getPath(path)).then(res => res.data)
const POST = (path: string, data: object) => axios.post(getPath(path), data)

export const CustomerApi = {
  list: () => GET('/customers?_embed=visits'),
  create: (data: object) => POST('/customers', data),
}

export const VisitApi = {
  create: (data: object) => POST('/visits', data),
}
