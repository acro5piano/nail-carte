import moment = require('moment')

export class CustomerForm {
  id?: number
  email?: string = ''
  name?: string = ''
  birthday?: Date = new Date('2000-01-01')
  address?: string = ''
  zip?: number
  occupation?: string = ''
  phoneNumber?: string = ''

  constructor(args = {}) {
    Object.assign(this, args)
  }

  toCreateCustomerParams() {
    const { email, name, occupation, phoneNumber, birthday, address, zip } = this
    return {
      email,
      name,
      phoneNumber: String(phoneNumber),
      occupation,
      address,
      zip,
      birthday: Number(moment(birthday)),
    }
  }

  get birthdayForHuman() {
    return moment(this.birthday).format('YYYY-MM-DD')
  }
}
