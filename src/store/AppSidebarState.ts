import { OpenSidebarUseCasePayload, CloseSidebarUseCasePayload } from '../use-case/ToggleAppSidebarUseCase'

interface AppSidebarStateArgs {
  isOpened: boolean
}

export class AppSidebarState {
  isOpened: boolean = false

  constructor({ isOpened }: AppSidebarStateArgs) {
    this.isOpened = isOpened
  }

  reduce(payload: OpenSidebarUseCasePayload | CloseSidebarUseCasePayload): AppSidebarState {
    switch (payload.type) {
      case 'OpenSidebarUseCasePayload':
        return new AppSidebarState({ isOpened: true })
      case 'CloseSidebarUseCasePayload':
        return new AppSidebarState({ isOpened: false })
      default:
        return this
    }
  }
}
