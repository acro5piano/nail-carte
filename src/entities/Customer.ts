interface CustomerArgs {
  id: number
  name: string
  birthday: Date
  address: string
  zip: number
  email: string
  createdAt: string
}

export default class Customer {
  id: number
  name: string
  birthday: Date
  address: string
  zip: number
  email: string
  createdAt: string
  occupation: string

  constructor(args: CustomerArgs) {
    Object.assign(this, args)
  }
}
