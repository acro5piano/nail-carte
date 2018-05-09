import * as React from 'react'
import AppHeader from './components/AppHeader'
import Button from 'material-ui/Button'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: { main: '#039ba4' },
    secondary: { main: '#02f1f8' },
    background: { paper: '#262f3d' },
  },
})

export default class App extends React.Component<{}> {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <AppHeader />
          <div>Hello World!!</div>
          <div className="AppBody">
            <Button variant="raised" color="primary">
              Hello World
            </Button>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
