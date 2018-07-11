export interface History {
  push: (pathname: string) => void
  goBack: () => void
}
