export interface History {
  push: (pathname: string) => void
  goBack: () => void
}

export interface LoginCredentials {
  email: string
  password: string
}

/* tslint:disable */
export interface InputEvent {
  target: {
    value: string
    name: string
  }
}
