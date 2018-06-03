export default class Visit {
  id: number
  customerId: number
  price: number
  note?: string
  startAt: number
  endAt: number
  createdAt: number

  constructor(args: any) {
    Object.assign(this, args)
  }
}
