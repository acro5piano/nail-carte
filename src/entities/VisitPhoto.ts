import moment = require('moment')

export default class VisitPhoto {
  id: number
  visitId: number
  url: string
  createdAt: moment.Moment

  constructor(args: any) {
    this.id = Number(args.id)
    this.visitId = Number(args.visitId)
    this.url = args.url
    this.createdAt = moment.unix(args.createdAt)
  }
}
