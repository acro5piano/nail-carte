import axios from 'axios'
import Customer from 'sarte/entities/Customer'
import Visit from 'sarte/entities/Visit'
import VisitPhoto from 'sarte/entities/VisitPhoto'
import { gql, baseUrl } from './graphqlClient'
import * as Query from './graphqlQuery'

const POST = (path: string, data: object) => axios.post(`${baseUrl}${path}`, data).then(res => res.data)

export const CustomerApi = {
  list: () => gql(Query.getCustomers).then(res => res.data.customers.map(c => new Customer(c))),
  create: (customer: object) => gql(Query.createCustomer, { customer }),
  update: (id: string, customer: object) => gql(Query.updateCustomer, { id, customer }),
}

export const VisitApi = {
  create: (visit: object) => gql(Query.createVisit, { visit }).then(res => new Visit(res.data.createVisit)),
}

export const VisitPhotoApi = {
  create: (visitPhoto: object) => gql(Query.createVisitPhoto, { visitPhoto }).then(res => new VisitPhoto(res)),
}

export const FileApi = {
  upload: (data: object) => POST('/files', data),
}
