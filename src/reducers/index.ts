import { combineReducers } from 'redux'
import sidebar from './sidebar'
import { reducer as form } from 'redux-form'

export default combineReducers({
  form,
  sidebar,
})
