import CustomerStore from './CustomerStore'
import UiStore from './UiStore'
import AuthStore from './AuthStore'

interface RootStoreArgs {
  customerStore?: CustomerStore
  uiStore?: UiStore
  authStore?: AuthStore
}

class RootStore {
  customerStore: CustomerStore
  uiStore: UiStore
  authStore: AuthStore

  constructor({ customerStore, uiStore, authStore }: RootStoreArgs = {}) {
    this.customerStore = customerStore || new CustomerStore(this)
    this.uiStore = uiStore || new UiStore(this)
    this.authStore = authStore || new AuthStore(this)
  }

  public async boot() {
    await this.authStore.boot()
    if (this.authStore.authenticated) {
      await this.customerStore.fetchCustomers()
    }
  }
}

export default RootStore
