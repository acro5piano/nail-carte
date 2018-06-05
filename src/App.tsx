import * as React from 'react'
import { Provider } from 'mobx-react'
import { configure } from 'mobx'
import RootStore from 'sarte/stores/RootStore'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import AppSidebar from 'sarte/components/AppSidebar/AppSidebar'
import Routes from 'sarte/Routes'
import { BrowserRouter as Router } from 'react-router-dom'

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#EB5757',
      contrastText: '#fff',
    },
    secondary: {
      main: '#02f1f8',
    },
  },
})

configure({ enforceActions: true })

// TODO: ref or withRouter...?
export default class AppContainer extends React.Component<{}> {
  rootStore: RootStore = new RootStore()

  public async componentWillMount() {
    this.rootStore = new RootStore()
    this.rootStore.boot()
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <Provider {...this.rootStore}>
            <Router ref={router => this.rootStore.routerStore.setRouter(router)}>
              <div>
                <Routes />
                <AppSidebar />
              </div>
            </Router>
          </Provider>
        </MuiThemeProvider>
      </React.Fragment>
    )
  }
}
