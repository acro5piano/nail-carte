import { Payload, UseCase } from 'almin'

export class OpenSidebarUseCasePayload extends Payload {
  type: string = 'OpenSidebarUseCasePayload'
}

export class CloseSidebarUseCasePayload extends Payload {
  type: string = 'CloseSidebarUseCasePayload'
}

export class OpenSidebarUseCase extends UseCase {
  execute() {
    this.dispatch(new OpenSidebarUseCasePayload())
  }
}

export class CloseSidebarUseCase extends UseCase {
  execute() {
    this.dispatch(new CloseSidebarUseCasePayload())
  }
}
