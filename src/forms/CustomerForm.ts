export class CustomerForm {
  email?: string = ''
  name?: string = ''
  birthday?: Date
  address?: string = ''
  zip?: number

  constructor(args) {
    Object.assign(this, args)
  }

  toCreateCustomerParams() {
    const { email, name, birthday, address, zip } = this
    return { email, name, birthday, address, zip }
  }
}
