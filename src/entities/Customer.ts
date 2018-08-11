import Visit, { VisitArgs } from 'sarte/entities/Visit'
import moment = require('moment')
import { CustomerForm } from 'sarte/forms/CustomerForm'
import _ from 'lodash'
import { rfc822 } from 'sarte/utils'

function hasPropertyAndIncludes(value: any, query: string): boolean {
  if (!value) {
    return false
  }
  return value.includes(query)
}

interface CustomerArgs {
  id?: string
  name?: string
  birthday?: string
  address?: string
  zip?: number
  phoneNumber?: string
  email?: string
  occupation?: string
  visits?: VisitArgs[]
  createdAt?: moment.Moment | string | number
}

export default class Customer {
  id?: string
  name?: string
  email?: string
  address?: string
  zip?: number
  occupation?: string
  birthday?: moment.Moment
  phoneNumber?: string
  visits: Visit[]
  createdAt?: moment.Moment

  constructor(args: CustomerArgs) {
    this.id = args.id
    this.name = args.name
    this.email = args.email
    this.address = args.address
    this.occupation = args.occupation
    this.phoneNumber = args.phoneNumber
    this.birthday = rfc822(args.birthday || '')
    this.visits = (args.visits || []).map(v => new Visit(v))
  }

  public get lastVisit(): Visit | null {
    if (this.visits.length === 0) {
      return null
    }
    const lastVisit = _.takeRight(this.visits)[0]
    if (!lastVisit) {
      return null
    }
    return lastVisit
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

  public get birthdayForHuman() {
    return this.birthday ? this.birthday.format('YYYY/MM/DD') : ''
  }

  public get age(): number | undefined {
    if (!this.birthday) {
      return undefined
    }
    return moment().diff(this.birthday, 'year')
  }

  public toForm(): CustomerForm {
    const { id, name, email, address, occupation, phoneNumber, birthday } = this
    return new CustomerForm({ id, name, email, address, occupation, phoneNumber, birthday })
  }

  public search(query: string) {
    return (
      hasPropertyAndIncludes(this.name, query) ||
      hasPropertyAndIncludes(this.email, query) ||
      hasPropertyAndIncludes(this.address, query)
    )
  }
}
