import _ from 'lodash'
import moment = require('moment')

export default class Visit {
  id: number
  customerId: number
  note?: string
  price: number
  startAt: moment.Moment
  endAt: moment.Moment
  createdAt: moment.Moment

  constructor(args: any) {
    Object.assign(this, _.pick(args, 'note'))
    this.id = Number(args.id)
    this.endAt = moment.unix(args.endAt)
    this.startAt = moment.unix(args.startAt)
    this.createdAt = moment.unix(args.createdAt)
  }
}
