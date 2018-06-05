// import { observable, decorate, action } from 'mobx'
import BaseStore from './BaseStore'
import { BrowserRouter } from 'react-router-dom'

export default class RouterStore extends BaseStore {
  router: BrowserRouter
  params: any

  public setRouter(router: BrowserRouter) {
    this.router = router
  }

  public setParams(params: any) {
    this.params = params
  }

  public goBack() {
    this.router.history.goBack()
  }

  public getParams() {
    console.log(this.params)
    if (!this.router || !this.router.match || !this.router.match.params) {
      return {}
    }
    return this.router.match.params
  }
}

// decorate(RouterStore, {
//   toggleSidebar: action,
// })
