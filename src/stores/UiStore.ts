import { observable, decorate, action, computed } from 'mobx'
import BaseStore from 'sarte/stores/BaseStore'

export default class UiStore extends BaseStore {
  isSidebarOpened = false
  message: string = ''

  public toggleSidebar = () => {
    this.isSidebarOpened = !this.isSidebarOpened
  }

  public showMessage = (message: string) => {
    this.message = message
  }

  public hideMessage = () => {
    this.message = ''
  }

  public get hasMessage() {
    return this.message !== ''
  }
}

decorate(UiStore, {
  isSidebarOpened: observable,
  message: observable,
  toggleSidebar: action,
  showMessage: action,
  hideMessage: action,
  hasMessage: computed,
})
