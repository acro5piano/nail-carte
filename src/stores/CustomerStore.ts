import { observable } from 'mobx'
import BaseStore from './BaseStore'
import Customer from 'sarte/entities/Customer'

export default class CustomerStore extends BaseStore {
  customers: Customer[] = observable([])
}
