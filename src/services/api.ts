import Customer from 'sarte/entities/Customer'
import Visit from 'sarte/entities/Visit'
import VisitPhoto from 'sarte/entities/VisitPhoto'
import User from 'sarte/entities/User'
import { LoginCredentials } from 'sarte/types'
import { gql } from './graphqlClient'
import { POST, GET, UPLOAD } from './xhrClient'
import * as Query from './graphqlQuery'

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

export const AuthApi = {
  login: (credentials: LoginCredentials) => POST('/login', credentials),
  me: () => GET('/me').then(res => new User(res)),
}

export const FileApi = {
  upload: (data: any) => UPLOAD('/files', data),
}
