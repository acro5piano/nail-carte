import moment = require('moment')

export class VisitForm {
  id?: string
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

  constructor(args: any) {
    this.id = args.id
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

  newInstance(props: Partial<VisitForm>): VisitForm {
    return new VisitForm({
      ...(this as Object),
      ...props,
    })
  }

  toCreateVisitParams() {
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
}
