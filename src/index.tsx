import * as React from 'react'
import * as ReactDOM from 'react-dom'
import 'typeface-roboto'
import './index.css'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import reducers from './reducers'
import App from './App'
import logger from 'redux-logger'

const store = createStore(
  reducers,
  applyMiddleware(logger),
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
