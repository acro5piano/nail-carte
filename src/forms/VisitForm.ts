import moment = require('moment')

export class VisitForm {
  id?: string
  customerId?: string
  menuId?: string
  price?: number
  note?: string
  visitOn?: string
  startAt?: string
  endAt?: string

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
  }

  toCreateVisitParams() {
    const { customerId, menuId, price, note, visitOn, startAt, endAt } = this
    return {
      customer: customerId,
      price: Number(price),
      menu: menuId,
      note,
      startAt: `${visitOn} ${startAt}`,
      endAt: `${visitOn} ${endAt}`,
    }
  }
}
