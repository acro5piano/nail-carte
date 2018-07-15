export interface History {
  push: (pathname: string) => void
  goBack: () => void
}

export interface LoginCredentials {
  email: string
  password: string
}
