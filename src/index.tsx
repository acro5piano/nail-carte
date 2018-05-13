import * as React from 'react'
import * as ReactDOM from 'react-dom'
import 'typeface-roboto'
import { Context, Dispatcher } from 'almin'
import './index.css'
import { AppContainer } from './AppContainer'
import { appStoreGroup } from './store/AppStoreGroup'
import { appContextLocator } from './AppContextLocator'

const dispatcher = new Dispatcher()

const appContext = new Context({
  dispatcher,
  store: appStoreGroup,
  options: {
    strict: true,
  },
})

appContextLocator.context = appContext

ReactDOM.render(
  <AppContainer appContext={appContext} />,
  document.getElementById('root'),
)
