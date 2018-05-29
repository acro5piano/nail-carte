import axios from 'axios'

const baseUrl = 'http://54.95.203.161:3000'

const getPath = path => baseUrl + path

const GET = (path: string) => axios.get(getPath(path)).then(res => res.data)
const POST = (path: string, data: object) => axios.post(getPath(path), data)

export const CustomerApi = {
  list: () => GET('/customers'),
  create: (data: object) => POST('/customers', data),
}
