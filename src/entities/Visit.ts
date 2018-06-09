import _ from 'lodash'
import moment = require('moment')
import VisitPhoto from 'sarte/entities/VisitPhoto'

export default class Visit {
  id: number
  customerId: number
  note?: string
  price: number
  startAt: moment.Moment
  endAt: moment.Moment
  createdAt: moment.Moment
  visitPhotos: VisitPhoto[]

  constructor(args: any) {
    Object.assign(this, _.pick(args, 'note'))
    this.id = Number(args.id)
    this.endAt = moment(args.endAt)
    this.startAt = moment(args.startAt)
    this.createdAt = moment(args.createdAt)
    this.visitPhotos = args.visitPhotos.map(v => new VisitPhoto(v))
  }
}
