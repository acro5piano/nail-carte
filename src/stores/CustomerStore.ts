import { flow, observable, computed, decorate, action } from 'mobx'
import { orderBy } from 'lodash'
import BaseStore from './BaseStore'
import Customer from 'sarte/entities/Customer'
import {
  CustomerApi,
} from 'sarte/services/api'
import { CustomerForm } from 'sarte/forms/CustomerForm'

export default class CustomerStore extends BaseStore {
  public customers: Customer[] = []

  public fetchCustomers = flow(function *() {
    this.customers = yield CustomerApi.list()
  })

  public get sortedCustomers() {
    return orderBy(this.customers, 'createdAt').reverse()
  }

  public createCustomer = flow(function *(customerForm: CustomerForm) {
    yield CustomerApi.create({
      ...customerForm.toCreateCustomerParams(),
      createdAt: Date.now(),
    })
    yield this.fetchCustomers()
    history.back()
  })
}

decorate(CustomerStore, {
  customers: observable,
  sortedCustomers: computed,
  fetchCustomers: action,
})
