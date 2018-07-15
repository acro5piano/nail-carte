import moment = require('moment')
import VisitPhoto from 'sarte/entities/VisitPhoto'
import { VisitForm } from 'sarte/forms/VisitForm'

export default class Visit {
  id: string
  customerId: string
  note?: string
  price: number
  startAt: moment.Moment
  endAt: moment.Moment
  visitPhotos: VisitPhoto[]

  constructor(args: any) {
    this.id = args.id
    this.customerId = args.customerId
    this.price = args.price
    this.note = args.note
    this.endAt = moment(args.endAt)
    this.startAt = moment(args.startAt)
    this.visitPhotos = args.visitPhotos ? args.visitPhotos.map(v => new VisitPhoto(v)) : []
  }

  public get localeStringPrice() {
    return this.price ? this.price.toLocaleString() : ''
  }

  public get startAtForHuman() {
    return this.startAt ? this.startAt.format('YYYY/MM/DD') : ''
  }

  public toForm(): VisitForm {
    const { id, customerId, note, price, startAt, visitPhotos } = this
    return new VisitForm({ id, customerId, note, price, startAt, visitPhotos })
  }
}
