import * as React from 'react'
import { Provider } from 'mobx-react'
import { configure } from 'mobx'
import RootStore from 'sarte/stores/RootStore'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import AppSidebar from 'sarte/components/AppSidebar/AppSidebar'
import Routes from 'sarte/Routes'
import {
  CustomerApi,
  VisitApi,
  VisitPhotoApi,
} from 'sarte/services/api'
import Customer from 'sarte/entities/Customer'
import { BrowserRouter as Router } from 'react-router-dom'
import { CustomerForm } from 'sarte/forms/CustomerForm'
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

configure({ enforceActions: true })

interface AppState {
  customers: Customer[]
  newCustomer: CustomerForm
}

const rootStore: RootStore = new RootStore()

export default class AppContainer extends React.Component<{}, AppState> {
  rootStore: RootStore = new RootStore()

  public state = {
    customers: [],
    newCustomer: new CustomerForm({ name: 'kazuya' }),
  }

  public async componentDidMount() {
    await this.fetchCustomers()
    this.rootStore = rootStore
  }

  public componentDidUpdate(prevProps, prevState) {
    logDifference(prevState, this.state)
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <Provider {...this.rootStore}>
            <Router>
              <div>
                <Routes
                  {...this.state}
                  {...this.actions}
                />
                <AppSidebar />
              </div>
            </Router>
          </Provider>
        </MuiThemeProvider>
      </React.Fragment>
    )
  }

  private get actions() {
    const {
      fetchCustomers,
      createCustomer,
      createVisit,
    } = this
    return {
      fetchCustomers,
      createCustomer,
      createVisit,
    }
  }

  private fetchCustomers = async() => this.setState({ customers: await CustomerApi.list() })

  private createCustomer = async(customerForm: CustomerForm) => {
    await CustomerApi.create({
      ...customerForm.toCreateCustomerParams(),
      createdAt: Date.now(),
    })
    await this.fetchCustomers()
    history.back()
  }

  private createVisit = async({ newVisit, visitPhotos }) => {
    const { id } = await VisitApi.create({
      ...newVisit.toCreateVisitParams(),
      createdAt: Date.now(),
    })
    if (visitPhotos.length > 0) {
      await visitPhotos.map(async(visitPhoto) =>
        VisitPhotoApi.create({
          ...visitPhoto,
          visitId: id,
        }),
      )
    }
    await this.fetchCustomers()
    history.back()
  }
}
