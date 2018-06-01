import * as React from 'react'
import CssBaseline from 'material-ui/CssBaseline'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import AppSidebar from 'sarte/components/AppSidebar/AppSidebar'
import Routes from 'sarte/Routes'
import { CustomerApi } from 'sarte/services/api'
import Customer from 'sarte/entities/Customer'
import { BrowserRouter as Router } from 'react-router-dom'
import { transform, isEqual, isObject } from 'lodash'

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

/**
 * Deep diff between two object, using lodash
 * @param  {Object} object Object compared
 * @param  {Object} base   Object to compare with
 * @return {Object}        Return a new object who represent the diff
 */
function difference(object, base) {
  return transform(object, (result, value, key) => {
    if (!isEqual(value, base[key])) {
      result[key] = isObject(value) && isObject(base[key]) ? difference(value, base[key]) : value
    }
  })
}

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
    await this.fetchCustomers()
  }

  componentDidUpdate(prevProps, prevState) {
    console.group('%c [log] App State Changed.', 'color: gray; font-weight: bold')
    console.log('%c [log] Old State:', 'color: red; font-weight: bold')
    console.log(difference(prevState, this.state))
    console.log('%c [log] New State:', 'color: green; font-weight: bold')
    console.log(difference(this.state, prevState))
    console.groupEnd()
  }

  toggleSidebar = () => this.setState({ isSidebarOpened: !this.state.isSidebarOpened })

  fetchCustomers = async() => this.setState({ customers: await CustomerApi.list() })

  createCustomer = () => CustomerApi.create({ name: 'kazuya' })

  get actions() {
    const {
      fetchCustomers,
      createCustomer,
      toggleSidebar,
    } = this
    return { fetchCustomers, createCustomer, toggleSidebar }
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <Router>
            <div>
              <Routes
                {...this.state}
                {...this.actions}
              />
              <AppSidebar
                isOpened={this.state.isSidebarOpened}
                onCloseSidebar={this.toggleSidebar}
              />
            </div>
          </Router>
        </MuiThemeProvider>
      </React.Fragment>
    )
  }
}
