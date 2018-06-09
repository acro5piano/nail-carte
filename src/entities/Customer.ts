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
  occupation?: string
  visits?: Visit[]
}

export default class Customer {
  id: number
  name: string
  email: string
  address?: string
  createdAt?: moment.Moment
  occupation?: string
  zip?: number
  birthday?: moment.Moment
  visits: Visit[]

  constructor(args: CustomerArgs) {
    this.id = Number(args.id)
    this.name = args.name
    this.email = args.email
    this.address = args.address
    this.occupation = args.occupation
    this.createdAt = moment(args.createdAt)
    this.birthday = args.birthday
    // this.birthday = moment(args.birthday)
    this.visits = args.visits.map(v => new Visit(v))
  }

  public get lastVisitAt(): string {
    if (this.visits.length === 0) {
      return '来店履歴なし'
    }
    const lastVisit = _.takeRight(this.visits)[0]
    if (!lastVisit) {
      return '来店履歴なし'
    }
    return String(moment().diff(lastVisit.startAt, 'days') + '日前')
  }
}
