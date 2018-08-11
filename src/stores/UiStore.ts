import { observable, decorate, action } from 'mobx'
import BaseStore from 'sarte/stores/BaseStore'

export default class UiStore extends BaseStore {
  isSidebarOpened = false

  public toggleSidebar = () => {
    this.isSidebarOpened = !this.isSidebarOpened
  }
}

decorate(UiStore, {
  isSidebarOpened: observable,
  toggleSidebar: action,
})
