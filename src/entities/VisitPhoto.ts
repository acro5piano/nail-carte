export default class VisitPhoto {
  id: string
  visitId: string
  url: string

  constructor(args: any) {
    this.id = args.id
    this.visitId = args.visitId
    this.url = args.url
  }
}
