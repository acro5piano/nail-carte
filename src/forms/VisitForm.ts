import moment = require('moment')

export class VisitForm {
  id?: number
  customerId: number
  price?: number
  note: string = ''
  startAt?: number = new Date()
  endAt?: number = new Date()
  createdAt?: number

  constructor(args = {}) {
    Object.assign(this, args)
  }

  toCreateVisitParams() {
    const { customerId, price, note, startAt, endAt, createdAt } = this
    return { customerId, price, note, startAt, endAt, createdAt }
  }

  get startAtForHuman() {
    return moment(this.startAt).format('YYYY-MM-DDTHH:mm')
  }

  get endAtForHuman() {
    return moment(this.endAt).add(1, 'hour').format('YYYY-MM-DDTHH:MM')
  }
}
