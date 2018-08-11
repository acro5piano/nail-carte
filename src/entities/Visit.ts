import moment = require('moment')
import { rfc822 } from 'sarte/utils'
import VisitPhoto from 'sarte/entities/VisitPhoto'
import Menu from 'sarte/entities/Menu'
import { VisitForm } from 'sarte/forms/VisitForm'

export interface VisitArgs {
  id: string
  customerId: string
  note?: string
  price?: number
  startAt: string
  endAt: string
  base?: string
  color?: string
  top?: string
  visitPhotos?: VisitPhoto[]
  menu?: Menu
}

export default class Visit {
  id: string
  customerId: string
  note?: string
  price: number
  startAt: moment.Moment
  endAt: moment.Moment
  base: string
  color: string
  top: string
  visitPhotos: VisitPhoto[]
  menuName: string

  constructor(args: VisitArgs) {
    this.id = args.id
    this.customerId = args.customerId
    this.price = args.price || 0
    this.note = args.note
    this.startAt = rfc822(args.startAt)
    this.endAt = rfc822(args.endAt)
    this.base = args.base || ''
    this.color = args.color || ''
    this.top = args.top || ''
    this.visitPhotos = args.visitPhotos ? args.visitPhotos.map(v => new VisitPhoto(v)) : []
    this.menuName = args.menu ? args.menu.name : ''
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
