import CustomerStore from './CustomerStore'
import UiStore from './UiStore'

interface RootStoreArgs {
  customerStore?: CustomerStore
  uiStore?: UiStore
}

class RootStore {
  customerStore: CustomerStore
  uiStore: UiStore

  constructor({
    customerStore,
    uiStore,
  }: RootStoreArgs = {}) {
    this.customerStore = customerStore || new CustomerStore(this)
    this.uiStore = uiStore || new UiStore(this)
  }

  public async boot() {
    this.customerStore.fetchCustomers()
  }
}

export default RootStore
