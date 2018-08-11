import * as React from 'react'
import { Provider } from 'mobx-react'
import { configure } from 'mobx'
import RootStore from 'sarte/stores/RootStore'
import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider } from '@material-ui/core/styles'
import AppSidebar from 'sarte/components/AppSidebar/AppSidebar'
import Routes, { LOGIN_PATH } from 'sarte/Routes'
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
  state = {
    booted: false,
  }

  rootStore: RootStore = new RootStore()

  public async componentWillMount() {
    this.rootStore = new RootStore()
    await this.rootStore.boot()
    this.setState({ booted: true })

    if (location.pathname !== LOGIN_PATH && !this.rootStore.authStore.authenticated) {
      location.href = LOGIN_PATH
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
            <Router>
              <ApolloProvider client={client}>
                <Routes />
                <AppSidebar />
              </ApolloProvider>
            </Router>
          </Provider>
        </MuiThemeProvider>
      </React.Fragment>
    )
  }
}
