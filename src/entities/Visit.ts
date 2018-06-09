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
    this.endAt = moment(args.endAt)
    this.startAt = moment(args.startAt)
    this.createdAt = moment(args.createdAt)
  }
}
