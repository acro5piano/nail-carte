import { flow, observable, computed, decorate, action } from 'mobx'
import BaseStore from 'sarte/stores/BaseStore'
import Customer from 'sarte/entities/Customer'
import Visit from 'sarte/entities/Visit'
import VisitPhoto from 'sarte/entities/VisitPhoto'
import { CustomerApi, VisitApi, VisitPhotoApi, FileApi } from 'sarte/services/api'
import { CustomerForm } from 'sarte/forms/CustomerForm'
import { VisitForm } from 'sarte/forms/VisitForm'

interface EditOrCreateVisitParams {
  visitForm: VisitForm
  visitPhotos: VisitPhoto[]
}

export default class CustomerStore extends BaseStore {
  public customers: Customer[] = []
  public currentCustomerId?: string = undefined
  public currentVisitId?: string = undefined

  public fetchCustomers = flow(function*(this: CustomerStore) {
    this.customers = yield CustomerApi.list()
  })

  public get sortedCustomers() {
    return this.customers
      .sort(customer => (customer.lastVisit ? Number(customer.lastVisit.startAt) : 0))
      .reverse()
  }

  public createCustomer = flow(function*(this: CustomerStore, customerForm: CustomerForm) {
    if (customerForm.id) {
      yield CustomerApi.update(customerForm.id, customerForm.toCreateCustomerParams())
    } else {
      yield CustomerApi.create(customerForm.toCreateCustomerParams())
    }
    yield this.fetchCustomers()
  })

  public get selectedCustomer(): Customer | undefined {
    return this.customers.find(c => c.id === this.currentCustomerId)
  }

  public uploadPhoto = flow(function*(file) {
    const formData = new FormData()
    formData.append('file', file)
    const res = yield FileApi.upload(formData)
    return new VisitPhoto(res)
  })

  public updateOrCreateVisit = flow(function*(
    this: CustomerStore,
    { visitForm, visitPhotos = [] }: EditOrCreateVisitParams,
  ) {
    if (!this.currentCustomerId) {
      return null
    }
    visitForm.customerId = this.currentCustomerId
    let id
    if (visitForm.id === 'new') {
      id = (yield VisitApi.create(visitForm.toVisitParams())).id
    } else {
      id = (yield VisitApi.update(visitForm.id, visitForm.toVisitParams())).id
    }
    if (visitPhotos.length > 0) {
      yield Promise.all(
        visitPhotos.map(async visitPhoto =>
          VisitPhotoApi.create({
            ...visitPhoto,
            visit: id,
          }),
        ),
      )
    }
    yield this.fetchCustomers()
  })

  public setCurrentCustomerId(id?: string) {
    this.currentCustomerId = id
  }

  public findCustomerByIdOrFail(id?: string): Customer {
    const customer = this.customers.find(c => c.id === id)
    if (!customer) {
      throw new Error('customer not found')
    }
    return customer
  }

  public async uploadAvatar(id, file: any) {
    const customer = this.findCustomerByIdOrFail(id)
    const formData = new FormData()
    formData.append('file', file)
    const res = await FileApi.upload(formData)
    await CustomerApi.update(customer.id, { avatarUrl: res.url })
    await this.fetchCustomers()
  }

  findCurrentCustomerVisitByVisitId(visitId: string): Visit {
    if (!this.selectedCustomer) {
      throw new Error('selected customer not found')
    }
    const visit = this.selectedCustomer.visits.find(v => v.id === visitId)
    if (!visit) {
      throw new Error('no visit found for: ' + visitId)
    }
    return visit
  }

  public setCurrentVisitId(id?: string) {
    this.currentVisitId = id
  }

  public get selectedVisit(): Visit | undefined {
    if (!this.selectedCustomer) {
      return undefined
    }
    return this.selectedCustomer.visits.find(v => v.id === this.currentVisitId)
  }

  public async deleteCurrentVisit() {
    if (!this.currentVisitId) {
      return
    }
    await VisitApi.delete(this.currentVisitId)
    await this.fetchCustomers()
  }
}

decorate(CustomerStore, {
  customers: observable,
  currentCustomerId: observable,
  currentVisitId: observable,
  setCurrentCustomerId: action,
  setCurrentVisitId: action,
  fetchCustomers: action,
  sortedCustomers: computed,
  selectedCustomer: computed,
  selectedVisit: computed,
})
