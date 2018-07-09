import axios from 'axios'
import Customer from 'sarte/entities/Customer'
import Visit from 'sarte/entities/Visit'
import VisitPhoto from 'sarte/entities/VisitPhoto'
import { gql, baseUrl } from './graphqlClient'
import { getCustomers } from './graphqlQuery'

const POST = (path: string, data: object) => axios.post(`${baseUrl}/${path}`, data).then(res => res.data)

export const CustomerApi = {
  list: () => gql(getCustomers).then(res => res.data.customers.map(c => new Customer(c))),
  create: (data: object) => POST('/customers', data),
  // update: (id: number, data: object) => PUT(`/customers/${id}`, data),
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
