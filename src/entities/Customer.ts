import Visit from 'sarte/entities/Visit'
import moment = require('moment')
import _ from 'lodash'

interface CustomerArgs {
  id?: number
  name?: string
  birthday?: moment.Moment
  address?: string
  zip?: number
  email?: string
  createdAt?: moment.Moment | string | number
  occupation?: moment.Moment
  visits?: Visit[]
}

export default class Customer {
  id: number
  name: string
  email: string
  address?: string
  createdAt?: moment.Moment
  occupation?: moment.Moment
  zip?: number
  birthday?: moment.Moment
  visits: Visit[]

  constructor(args: CustomerArgs) {
    Object.assign(this, _.pick(args, 'name', 'email', 'address'))
    this.id = Number(args.id)
    this.createdAt = moment(args.createdAt)
    this.birthday = args.birthday
    // this.createdAt = moment(args.createdAt).unix
    // this.birthday = moment(args.birthday)
    this.visits = args.visits.map(v => new Visit(v))
  }
}
