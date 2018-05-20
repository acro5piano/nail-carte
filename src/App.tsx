import * as React from 'react'
import CssBaseline from 'material-ui/CssBaseline'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import AppHeader from 'sarte/components/AppHeader'
import AppSidebar from 'sarte/components/AppSidebar/AppSidebar'
import Routes from 'sarte/Routes'
import { CustomerApi } from 'sarte/services/api'
import Customer from 'sarte/entities/Customer'

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

interface AppState {
  isSidebarOpened: boolean
  customers: Customer[]
}

export default class AppContainer extends React.Component<{}, AppState> {
  state = {
    isSidebarOpened: false,
    customers: [],
  }

  async componentDidMount() {
    const customers = await CustomerApi.list()
    this.setState({ customers })
  }

  toggleSidebar = () => this.setState({ isSidebarOpened: !this.state.isSidebarOpened })

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <div>
            <AppHeader onClickMenu={this.toggleSidebar} />
            <Routes {...this.state} />
            <AppSidebar
              isOpened={this.state.isSidebarOpened}
              onCloseSidebar={this.toggleSidebar}
            />
          </div>
        </MuiThemeProvider>
      </React.Fragment>
    )
  }
}
