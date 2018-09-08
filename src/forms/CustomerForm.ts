import moment = require('moment')
import Customer from 'sarte/entities/Customer'

export class CustomerForm {
  id?: string
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

  public static fromEntity(entity: Customer): CustomerForm {
    const { id, name, email, address, occupation, phoneNumber, birthday } = entity
    return new CustomerForm({
      id,
      name,
      email,
      address,
      occupation,
      birthday,
      phoneNumber: (phoneNumber || '').replace(/-/g, ''),
    })
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
      birthday: String(birthday),
    }
  }

  get birthdayForHuman() {
    return moment(this.birthday).format('YYYY-MM-DD')
  }
}
