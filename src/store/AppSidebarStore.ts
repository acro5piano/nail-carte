import { Payload, Store } from 'almin'
import { AppSidebarState } from './AppSidebarState'

export class AppSidebarStore extends Store {
  constructor() {
    super()

    this.state = new AppSidebarState({ isOpened: false })
  }

  getState(): AppSidebarState {
    return this.state
  }

  receivePayload(payload: Payload): void {
    this.setState(this.state.reduce(payload))
  }
}
