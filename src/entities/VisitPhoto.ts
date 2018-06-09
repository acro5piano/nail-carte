import moment = require('moment')

export default class VisitPhoto {
  id: number
  visitId: number
  url: string
  createdAt: moment.Moment

  constructor(args: any) {
    this.id = args.id
    this.visitId = args.visitId
    this.url = args.url
    this.createdAt = moment(args.createdAt)
  }
}
