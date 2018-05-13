import * as React from 'react'
import * as ReactDOM from 'react-dom'
import 'typeface-roboto'
import { Context, Dispatcher, StoreGroup } from 'almin'

import './index.css'
import App from './App'
import { AppSidebarStore } from './store/AppSidebarStore'

const dispatcher = new Dispatcher()
const storeGroup = new StoreGroup({
  appSidebar: new AppSidebarStore(),
})

const appContext = new Context({
  dispatcher,
  store: storeGroup,
  options: {
    strict: true,
  },
})

ReactDOM.render(
  <App appContext={appContext} />,
  document.getElementById('root'),
)
