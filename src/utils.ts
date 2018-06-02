import { transform, isEqual, isObject } from 'lodash'

/**
 * Deep diff between two object, using lodash
 * @param  {Object} object Object compared
 * @param  {Object} base   Object to compare with
 * @return {Object}        Return a new object who represent the diff
 */
export const difference = (object, base) => transform(object, (result, value, key) => {
  if (!isEqual(value, base[key])) {
    result[key] = isObject(value) && isObject(base[key]) ? difference(value, base[key]) : value
  }
})

export const logDifference = (prevState, currentState) => {
  console.group('%c [log] App State Changed.', 'color: gray; font-weight: bold')
  console.log('%c [log] Old State:', 'color: red; font-weight: bold')
  console.log(difference(prevState, currentState))
  console.log('%c [log] New State:', 'color: green; font-weight: bold')
  console.log(difference(currentState, prevState))
  console.groupEnd()
}
