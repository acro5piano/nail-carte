import * as React from 'react'
import CssBaseline from 'material-ui/CssBaseline'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import AppHeader from 'sarte/components/AppHeader'
import AppSidebar from 'sarte/components/AppSidebar'
import Routes from 'sarte/Routes'
import { CustomerApi } from 'sarte/services/api'

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

export default class AppContainer extends React.Component<{}> {
  state = {
    isSidebarOpened: false,
  }

  toggleSidebar = () => this.setState({ isSidebarOpened: !this.state.isSidebarOpened })

  componentDidMount() {
    CustomerApi.list()
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <div>
            <AppHeader onClickMenu={this.toggleSidebar} />
            <Routes />
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
