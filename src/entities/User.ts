import moment = require('moment')

export interface UpdatableParams {
  email: string
  name: string
}

export interface UserArgs {
  _id: string
  email: string
  name: string
  team: string
  createdAt: string
  updatedAt: string
}

export default class User {
  id: string
  email: string
  name: string
  team: string
  createdAt: moment.Moment
  updatedAt: moment.Moment

  constructor(args: UserArgs) {
    this.id = args._id
    this.email = args.email
    this.name = args.name
    this.team = args.team
    this.createdAt = moment(args.createdAt)
    this.updatedAt = moment(args.updatedAt)
  }
}
