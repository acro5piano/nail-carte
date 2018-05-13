import * as React from 'react'
import * as ReactDOM from 'react-dom'
import 'typeface-roboto'
import { Context, Dispatcher, StoreGroup } from 'almin'

import './index.css'
import { AppContainer } from './AppContainer'
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
  <AppContainer appContext={appContext} />,
  document.getElementById('root'),
)
