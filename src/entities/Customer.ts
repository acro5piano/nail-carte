import Visit from 'sarte/entities/Visit'

interface CustomerArgs {
  id?: number
  name?: string
  birthday?: Date
  address?: string
  zip?: number
  email?: string
  createdAt?: string
  occupation?: string
  visits?: Visit[]
}

export default class Customer {
  id: number
  name: string
  birthday: Date
  address?: string
  zip?: number
  email: string
  createdAt?: string
  occupation?: string
  visits: Visit[]

  constructor(args: CustomerArgs) {
    Object.assign(this, args)
    this.visits = args.visits.map(v => new Visit(v))
  }
}
