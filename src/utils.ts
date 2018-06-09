import Validator from 'validatorjs'

export const validate = (input: any, rules: any): boolean => new Validator(input, rules).passes()
