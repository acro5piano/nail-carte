import moment = require('moment')
import Visit from 'sarte/entities/Visit'
// import { validate } from 'sarte/utils'

interface VisitFormArgs {
  id?: string
  customerId?: string
  menuId?: string
  price?: number
  note?: string
  visitOn?: string
  startAt?: string
  endAt?: string
  baseBrand?: string
  colorBrand?: string
  topBrand?: string
  baseSku?: string
  colorSku?: string
  topSku?: string
}

export class VisitForm {
  id: string
  customerId?: string
  menuId?: string
  price?: number
  note?: string
  visitOn: string
  startAt: string
  endAt: string
  baseBrand: string
  colorBrand: string
  topBrand: string
  baseSku: string
  colorSku: string
  topSku: string

  constructor(args: VisitFormArgs) {
    this.id = args.id || 'new'
    this.customerId = args.customerId
    this.menuId = args.menuId
    this.price = Number(args.price || 0)
    this.note = args.note
    this.visitOn = args.visitOn || moment().format('YYYY-MM-DD')
    this.startAt =
      args.startAt ||
      moment()
        .add(-1, 'hour')
        .format('HH:mm')
    this.endAt = args.endAt || moment().format('HH:mm')
    this.baseBrand = args.baseBrand || ''
    this.colorBrand = args.colorBrand || ''
    this.topBrand = args.topBrand || ''
    this.baseSku = args.baseSku || ''
    this.colorSku = args.colorSku || ''
    this.topSku = args.topSku || ''
  }

  static fromEntitiy(visit: Visit) {
    return new VisitForm({
      ...visit,
      visitOn: visit.startAt.format('YYYY-MM-DD'),
      startAt: visit.startAt.format('HH:mm'),
      endAt: visit.endAt.format('HH:mm'),
    } as VisitFormArgs)
  }

  newInstance(props: Partial<VisitFormArgs>): VisitForm {
    return new VisitForm({
      ...(this as VisitFormArgs),
      ...props,
    })
  }

  toVisitParams() {
    const {
      customerId,
      menuId,
      price,
      note,
      visitOn,
      startAt,
      endAt,
      baseBrand,
      colorBrand,
      topBrand,
      baseSku,
      colorSku,
      topSku,
    } = this
    return {
      customer: customerId,
      price: Number(price),
      menu: menuId,
      note,
      startAt: `${visitOn} ${startAt}`,
      endAt: `${visitOn} ${endAt}`,
      baseBrand,
      colorBrand,
      topBrand,
      baseSku,
      colorSku,
      topSku,
    }
  }

  validate() {
    return true

    // const { price, note, startAt, endAt } = this
    // return validate(
    //   {
    //     price,
    //     note,
    //     startAt,
    //     endAt,
    //   },
    //   {
    //     price: 'required|numeric|min:500',
    //     note: 'max:200',
    //     startAt: 'date',
    //     endAt: 'date',
    //   },
    // )
  }
}
