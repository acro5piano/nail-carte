import CustomerStore from './CustomerStore'
import UiStore from './UiStore'
import RouterStore from './RouterStore'

interface RootStoreArgs {
  customerStore?: CustomerStore
  uiStore?: UiStore
  routerStore?: RouterStore
}

class RootStore {
  customerStore: CustomerStore
  uiStore: UiStore
  routerStore: RouterStore

  constructor({
    customerStore,
    uiStore,
    routerStore,
  }: RootStoreArgs = {}) {
    this.customerStore = customerStore || new CustomerStore(this)
    this.uiStore = uiStore || new UiStore(this)
    this.routerStore = routerStore || new RouterStore(this)
  }

  public async boot() {
    return this.customerStore.fetchCustomers()
  }
}

export default RootStore
