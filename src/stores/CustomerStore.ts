import { flow, observable, computed, decorate, action } from 'mobx'
import { orderBy } from 'lodash'
import BaseStore from './BaseStore'
import Customer from 'sarte/entities/Customer'
import VisitPhoto from 'sarte/entities/VisitPhoto'
import { CustomerApi, VisitApi, VisitPhotoApi, FileApi } from 'sarte/services/api'
import { CustomerForm } from 'sarte/forms/CustomerForm'
import { VisitForm } from 'sarte/forms/VisitForm'

interface CreateVisitParams {
  visitForm: VisitForm
  visitPhotos: VisitPhoto[]
}

export default class CustomerStore extends BaseStore {
  public customers: Customer[] = []

  public fetchCustomers = flow(function*(this: CustomerStore) {
    this.customers = yield CustomerApi.list()
  })

  public get sortedCustomers() {
    return orderBy(this.customers, 'createdAt').reverse()
  }

  public createCustomer = flow(function*(this: CustomerStore, customerForm: CustomerForm) {
    if (customerForm.id) {
      yield CustomerApi.update(customerForm.id, customerForm.toCreateCustomerParams())
    } else {
      yield CustomerApi.create(customerForm.toCreateCustomerParams())
    }
    yield this.fetchCustomers()
  })

  public get selectedCustomer() {
    const match = location.pathname.match(/customers\/([0-9|a-z]+)/)
    if (!match) {
      return null
    }
    const id = match[1]
    return this.customers.find(c => c.id === id)
  }

  public uploadPhoto = flow(function*(file) {
    const formData = new FormData()
    formData.append('file', file)
    const res = yield FileApi.upload(formData)
    return new VisitPhoto({
      url: res.path,
    })
  })

  public createVisit = flow(function*(this: CustomerStore, { visitForm, visitPhotos = [] }: CreateVisitParams) {
    if (!this.selectedCustomer) {
      return null
    }
    visitForm.customerId = this.selectedCustomer.id
    const { id } = yield VisitApi.create(visitForm.toCreateVisitParams())
    if (visitPhotos.length > 0) {
      yield Promise.all(
        visitPhotos.map(async visitPhoto =>
          VisitPhotoApi.create({
            ...visitPhoto,
            visitId: id,
          }),
        ),
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
