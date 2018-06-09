// import _ from 'lodash'
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
    this.id = args.id
    this.price = args.price
    this.note = args.note
    this.endAt = moment(args.endAt)
    this.startAt = moment(args.startAt)
    this.createdAt = moment(args.createdAt)
    this.visitPhotos = args.visitPhotos ? args.visitPhotos.map(v => new VisitPhoto(v)) : []
  }

  public get localeStringPrice() {
    return this.price ? this.price.toLocaleString() : ''
  }

  public get startAtForHuman() {
    return this.startAt ? this.startAt.format('YYYY/MM/DD') : ''
  }
}
