import moment = require('moment')

export class VisitForm {
  id?: string
  customerId?: string
  price?: number
  note: string = ''
  startAt?: moment.Moment = moment().add(-1, 'hour')
  endAt?: moment.Moment = moment()

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
    if (!this.startAt) {
      return ''
    }
    return this.startAt.format('YYYY-MM-DDTHH:mm')
  }

  get endAtForHuman() {
    if (!this.endAt) {
      return ''
    }
    return this.endAt.format('YYYY-MM-DDTHH:mm')
  }
}
