import * as React from 'react'
import CssBaseline from 'material-ui/CssBaseline'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import AppHeader from 'sarte/components/AppHeader/AppHeaderContainer'
import AppSidebar from 'sarte/components/AppSidebar/AppSidebarContainer'
import Routes from 'sarte/Routes'
import { clientApi } from 'sarte/services/api'

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
  componentDidMount() {
    clientApi.list()
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <div>
            <AppHeader />
            <Routes />
            <AppSidebar />
          </div>
        </MuiThemeProvider>
      </React.Fragment>
    )
  }
}
