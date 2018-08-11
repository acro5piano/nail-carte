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
  base: string
  color: string
  top: string

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
    this.base = args.base || ''
    this.color = args.color || ''
    this.top = args.top || ''
  }

  newInstance(props: Partial<VisitForm>): VisitForm {
    return new VisitForm({
      ...(this as Object),
      ...props,
    })
  }

  toCreateVisitParams() {
    const { customerId, menuId, price, note, visitOn, startAt, endAt, base, color, top } = this
    return {
      customer: customerId,
      price: Number(price),
      menu: menuId,
      note,
      startAt: `${visitOn} ${startAt}`,
      endAt: `${visitOn} ${endAt}`,
      base,
      color,
      top,
    }
  }
}
