import { flow, observable, computed, decorate, action } from 'mobx'
import { orderBy } from 'lodash'
import BaseStore from './BaseStore'
import Customer from 'sarte/entities/Customer'
import VisitPhoto from 'sarte/entities/VisitPhoto'
import {
  CustomerApi,
  VisitApi,
  VisitPhotoApi,
} from 'sarte/services/api'
import { CustomerForm } from 'sarte/forms/CustomerForm'
import { VisitForm } from 'sarte/forms/VisitForm'

interface CreateVisitParams {
  visitForm: VisitForm
  visitPhotos: VisitPhoto[]
}

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
    this.rootStore.routerStore.goBack()
  })

  public get selectedCustomer() {
    if (!location.pathname.match(/customers\/(\d+)/)) {
      return null
    }
    const id = location.pathname.match(/customers\/(\d+)/)[1]
    return this.customers.find(c => c.id === Number(id))
  }

  public createVisit = flow(function *({ visitForm, visitPhotos = [] }: CreateVisitParams) {
    visitForm.customerId = this.selectedCustomer.id
    const { id } = yield VisitApi.create({
      ...visitForm.toCreateVisitParams(),
      createdAt: Date.now(),
    })
    if (visitPhotos.length > 0) {
      yield visitPhotos.map(async(visitPhoto) =>
        VisitPhotoApi.create({
          ...visitPhoto,
          visitId: id,
        }),
      )
    }
    yield this.fetchCustomers()
    history.back()
  })
}

decorate(CustomerStore, {
  customers: observable,
  fetchCustomers: action,
  sortedCustomers: computed,
  selectedCustomer: computed,
})
