import moment = require('moment')
import { rfc822 } from 'sarte/utils'
import VisitPhoto from 'sarte/entities/VisitPhoto'
import Menu from 'sarte/entities/Menu'

export interface VisitArgs {
  id: string
  customerId: string
  note?: string
  price?: number
  startAt: string
  endAt: string
  baseBrand?: string
  baseSku?: string
  colorBrand?: string
  colorSku?: string
  topBrand?: string
  topSku?: string
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
  baseBrand: string
  baseSku: string
  colorBrand: string
  colorSku: string
  topBrand: string
  topSku: string
  visitPhotos: VisitPhoto[]
  menuName: string

  constructor(args: VisitArgs) {
    this.id = args.id
    this.customerId = args.customerId
    this.price = args.price || 0
    this.note = args.note
    this.startAt = rfc822(args.startAt)
    this.endAt = rfc822(args.endAt)
    this.baseBrand = args.baseBrand || ''
    this.baseSku = args.baseSku || ''
    this.colorBrand = args.colorBrand || ''
    this.colorSku = args.colorSku || ''
    this.topBrand = args.topBrand || ''
    this.topSku = args.topSku || ''
    this.visitPhotos = args.visitPhotos ? args.visitPhotos.map(v => new VisitPhoto(v)) : []
    this.menuName = args.menu ? args.menu.name : ''
  }

  public get localeStringPrice() {
    return this.price ? this.price.toLocaleString() : ''
  }

  public get startAtForHuman() {
    return this.startAt ? this.startAt.format('YYYY/MM/DD') : ''
  }

  public get base(): string {
    return this.baseBrand + (this.baseSku ? this.baseSku : '')
  }

  public get color(): string {
    return this.colorBrand + (this.colorSku ? this.colorSku : '')
  }

  public get top(): string {
    return this.topBrand + (this.topSku ? this.topSku : '')
  }
}
