import * as React from 'react'
import * as ReactDOM from 'react-dom'
import 'typeface-roboto'
import './index.css'
import { Provider } from 'react-redux'
import logger from 'redux-logger'
import { applyMiddleware, createStore } from 'redux'
import reducers from 'sarte/reducers'
import App from 'sarte/App'

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
