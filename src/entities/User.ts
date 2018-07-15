import moment = require('moment')

export interface UserArgs {
  _id: string
  email: string
  name: string
  createdAt: string
  updatedAt: string
}

export default class User {
  id: string
  email: string
  name: string
  createdAt: moment.Moment
  updatedAt: moment.Moment

  constructor(args: UserArgs) {
    this.id = args._id
    this.email = args.email
    this.name = args.name
    this.createdAt = moment(args.createdAt)
    this.updatedAt = moment(args.updatedAt)
  }
}
