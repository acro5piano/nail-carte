import axios from 'axios'
import Customer from 'sarte/entities/Customer'
import Visit from 'sarte/entities/Visit'
import VisitPhoto from 'sarte/entities/VisitPhoto'

const baseUrl = 'https://api.fastestnews.org'
// const baseUrl = 'http://localhost:3000'

const getPath = path => baseUrl + path

const GET = (path: string) => axios.get(getPath(path)).then(res => res.data)
const POST = (path: string, data: object) => axios.post(getPath(path), data).then(res => res.data)
const PUT = (path: string, data: object) => axios.put(getPath(path), data).then(res => res.data)

export const CustomerApi = {
  list: () => GET('/customers').then(res => res.map(c => new Customer(c))),
  create: (data: object) => POST('/customers', data),
  update: (id: number, data: object) => PUT(`/customers/${id}`, data),
}

export const VisitApi = {
  create: (data: object) => POST('/visits', data).then(res => new Visit(res)),
}

export const VisitPhotoApi = {
  create: (data: object) => POST('/visit_photos', data).then(res => new VisitPhoto(res)),
}

export const FileApi = {
  upload: (data: object) => POST('/files', data),
}
