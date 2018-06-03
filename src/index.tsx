import * as React from 'react'
import * as ReactDOM from 'react-dom'
import 'typeface-roboto'
import './index.css'
import App from 'sarte/App'
import register from 'sarte/registerServiceWorker'

if (module.hot) {
  module.hot.accept(() => {
    window.location.reload()
  })
}

ReactDOM.render(
  <App />,
  document.getElementById('root'),
)
register()
