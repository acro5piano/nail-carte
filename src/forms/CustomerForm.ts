import moment = require('moment')

export class CustomerForm {
  email?: string = ''
  name?: string = ''
  birthday?: Date = new Date()
  address?: string = ''
  zip?: number
  createdAt?: number
  occupation?: string = ''

  constructor(args = {}) {
    Object.assign(this, args)
  }

  toCreateCustomerParams() {
    const { email, name, birthday, address, zip } = this
    return {
      email,
      name,
      address,
      zip,
      birthday: Number(moment(birthday)),
    }
  }

  get birthdayForHuman() {
    return moment(this.birthday).format('YYYY-MM-DD')
  }
}
