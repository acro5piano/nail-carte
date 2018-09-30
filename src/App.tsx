import * as React from 'react'
import Snackbar from 'sarte/components/Snackbar'
import { ContextRouter } from 'react-router'
import { Provider } from 'mobx-react'
import { configure } from 'mobx'
import RootStore from 'sarte/stores/RootStore'
import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider } from '@material-ui/core/styles'
import AppSidebar from 'sarte/components/AppSidebar/AppSidebar'
import Routes, { LOGIN_PATH, REGISTER_PATH, INPUT_TEAM_PATH } from 'sarte/Routes'
import { BrowserRouter as Router } from 'react-router-dom'
import { client } from 'sarte/services/graphqlClient'
import { ApolloProvider } from 'react-apollo'
import theme from './theme'

configure({ enforceActions: true })

interface AppState {
  booted: boolean
}

// TODO: ref or withRouter...?
export default class AppContainer extends React.Component<{}, AppState> {
  router: ContextRouter

  state = {
    booted: false,
  }

  rootStore: RootStore = new RootStore()

  public async componentWillMount() {
    this.rootStore = new RootStore()
    await this.rootStore.boot()
    this.setState({ booted: true })

    if (
      location.pathname !== LOGIN_PATH &&
      location.pathname !== REGISTER_PATH &&
      !this.rootStore.authStore.authenticated
    ) {
      this.router.history.push(LOGIN_PATH)
    }
    if (this.rootStore.authStore.user && !this.rootStore.authStore.user.team) {
      this.router.history.push(INPUT_TEAM_PATH)
    }

    const loading = document.getElementById('loading')
    if (!loading) {
      throw Error('Loading Element not found')
    }
    loading.remove()
  }

  render() {
    if (!this.state.booted) {
      return null
    }

    return (
      <React.Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <Provider {...this.rootStore} rootStore={this.rootStore}>
            <React.Fragment>
              <Router ref={router => (this.router = router)}>
                <ApolloProvider client={client}>
                  <Routes />
                  <AppSidebar />
                </ApolloProvider>
              </Router>
              <Snackbar uiStore={this.rootStore.uiStore} />
            </React.Fragment>
          </Provider>
        </MuiThemeProvider>
      </React.Fragment>
    )
  }
}
