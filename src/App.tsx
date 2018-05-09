import * as React from 'react'
import CssBaseline from 'material-ui/CssBaseline'
import AppHeader from './components/AppHeader'
import AppSidebar from './components/AppSidebar'
import Button from 'material-ui/Button'
import AddIcon from '@material-ui/icons/Add'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'

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
  sidebarOpen: boolean
}

export default class App extends React.Component<{}, AppState> {
  state = {
    sidebarOpen: false,
  }

  toggleSidebar = () => this.setState({ sidebarOpen: !this.state.sidebarOpen })

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <div>
            <AppHeader
              onClickMenu={this.toggleSidebar}
            />
            <div className="AppBody">
              <Button onClick={this.toggleSidebar} variant="fab" color="primary">
                <AddIcon />
              </Button>
            </div>

            <AppSidebar
              open={this.state.sidebarOpen}
              onClose={this.toggleSidebar}
            />
          </div>
        </MuiThemeProvider>
      </React.Fragment>
    )
  }
}
