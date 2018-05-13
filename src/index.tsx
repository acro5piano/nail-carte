import * as React from 'react'
import * as ReactDOM from 'react-dom'
import 'typeface-roboto'
import { Context, Dispatcher } from 'almin'
import './index.css'
import AppContainer from './components/AppContainer'
import { appStoreGroup } from './store/AppStoreGroup'
import { appContextLocator } from './AppContextLocator'
import { AlminReactContainer } from 'almin-react-container'

const dispatcher = new Dispatcher()

const appContext = new Context({
  dispatcher,
  store: appStoreGroup,
  options: {
    strict: true,
  },
})

appContextLocator.context = appContext

const App = AlminReactContainer.create(AppContainer, appContext)

ReactDOM.render(
  <App />,
  document.getElementById('root'),
)
