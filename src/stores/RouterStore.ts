import BaseStore from './BaseStore'
import { BrowserRouter } from 'react-router-dom'
import { getLink, EDIT_CUSTOMER_PATH } from 'sarte/Routes'

export default class RouterStore extends BaseStore {
  router: BrowserRouter
  params: Object

  public setRouter(router: BrowserRouter) {
    this.router = router
  }

  public setParams(params: Object) {
    this.params = params
  }

  public goBack() {
    this.router.history.goBack()
  }

  public toSelectedCustomerEditPath = () => {
    const path = getLink(EDIT_CUSTOMER_PATH, this.rootStore.customerStore.selectedCustomer.id)
    this.router.history.push(path)
  }

  public getParams() {
    console.log(this.router)
    if (!this.router || !this.router.match || !this.router.match.params) {
      return {}
    }
    return this.router.match.params
  }
}
