import moment = require('moment')

export class VisitForm {
  id?: number
  customerId: number
  price?: number
  note: string = ''
  startAt?: Date = new Date()
  endAt?: Date = new Date()
  createdAt?: number

  constructor(args = {}) {
    Object.assign(this, args)
  }

  toCreateVisitParams() {
    const { customerId, price, note, startAt, endAt } = this
    return {
      customerId: Number(customerId),
      price: Number(price),
      note,
      startAt: Number(moment(startAt)),
      endAt: Number(moment(endAt)),
    }
  }

  get startAtForHuman() {
    return moment(this.startAt).format('YYYY-MM-DDTHH:mm')
  }

  get endAtForHuman() {
    return moment(this.endAt).add(1, 'hour').format('YYYY-MM-DDTHH:MM')
  }
}
