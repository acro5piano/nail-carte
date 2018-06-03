import * as React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import AppSidebar from 'sarte/components/AppSidebar/AppSidebar'
import Routes from 'sarte/Routes'
import {
  CustomerApi,
  VisitApi,
} from 'sarte/services/api'
import Customer from 'sarte/entities/Customer'
import { BrowserRouter as Router } from 'react-router-dom'
import { CustomerForm } from 'sarte/forms/CustomerForm'
import { VisitForm } from 'sarte/forms/VisitForm'
import { logDifference } from 'sarte/utils'

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
  newCustomer: CustomerForm
}

export default class AppContainer extends React.Component<{}, AppState> {
  public state = {
    isSidebarOpened: false,
    customers: [],
    newCustomer: new CustomerForm({ name: 'kazuya' }),
  }

  public async componentDidMount() {
    await this.fetchCustomers()
  }

  public componentDidUpdate(prevProps, prevState) {
    logDifference(prevState, this.state)
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

  private get actions() {
    const {
      fetchCustomers,
      createCustomer,
      toggleSidebar,
      createVisit,
    } = this
    return {
      fetchCustomers,
      createCustomer,
      toggleSidebar,
      createVisit,
    }
  }

  private toggleSidebar = () => this.setState({ isSidebarOpened: !this.state.isSidebarOpened })

  private fetchCustomers = async() => this.setState({ customers: await CustomerApi.list() })

  private createCustomer = async(customerForm: CustomerForm) => {
    await CustomerApi.create({
      ...customerForm.toCreateCustomerParams(),
      createdAt: Date.now(),
    })
    await this.fetchCustomers()
    history.back()
  }

  private createVisit = async(visitForm: VisitForm) => {
    console.log(visitForm.toCreateVisitParams())
    await VisitApi.create({
      ...visitForm.toCreateVisitParams(),
      createdAt: Date.now(),
    })
    await this.fetchCustomers()
    history.back()
  }
}
