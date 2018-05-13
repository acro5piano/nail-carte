import * as React from 'react'
import CssBaseline from 'material-ui/CssBaseline'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import AppHeader from './AppHeader'
import AppSidebar from './AppSidebar'
import AppBody from './AppBody'
import { appStoreGroup } from '../store/AppStoreGroup'

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

type AppProps = typeof appStoreGroup.state

export default class AppContainer extends React.Component<AppProps> {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <div>
            <AppHeader />
            <AppBody />
            <AppSidebar open={this.props.appSidebarState.isOpened} />
          </div>
        </MuiThemeProvider>
      </React.Fragment>
    )
  }
}
