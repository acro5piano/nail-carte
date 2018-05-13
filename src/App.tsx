import * as React from 'react'
import CssBaseline from 'material-ui/CssBaseline'
import Button from 'material-ui/Button'
import AddIcon from '@material-ui/icons/Add'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import { Context } from 'almin'
import AppHeader from './components/AppHeader'
import AppSidebar from './components/AppSidebar'
import { AppSidebarState } from './store/AppSidebarState'
import { OpenSidebarUseCase, CloseSidebarUseCase } from './use-case/ToggleAppSidebarUseCase'

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

interface AppContext {
  appSidebar: AppSidebarState
}

interface AppProps {
  appContext: Context<AppContext>
}

interface AppState {
  appSidebar: AppSidebarState
}

export default class App extends React.Component<AppProps, AppState> {
  unSubscribe: () => void

  constructor(props) {
    super(props)
    this.state = props.appContext.getState()
  }

  componentDidMount() {
    const { appContext } = this.props
    const onChangeHandler = () => {
      this.setState(appContext.getState())
    }
    this.unSubscribe = appContext.onChange(onChangeHandler)
  }

  componentDidUnmount() {
    if (typeof this.unSubscribe === 'function') {
      this.unSubscribe()
    }
  }

  toggleSidebar = () => {
    const useCase = this.state.appSidebar.isOpened ? new CloseSidebarUseCase() : new OpenSidebarUseCase()
    this.props.appContext.useCase(useCase).execute()
  }

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
              open={this.state.appSidebar.isOpened}
              onClose={this.toggleSidebar}
            />
          </div>
        </MuiThemeProvider>
      </React.Fragment>
    )
  }
}
