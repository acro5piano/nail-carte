import Validator from 'validatorjs'
import moment = require('moment')

export const validate = (input: any, rules: any): boolean => new Validator(input, rules).passes()

export const rfc822 = (input: string): moment.Moment => moment(input, 'ddd, MMM DD YYYY HH:mm:ss ZZ')
