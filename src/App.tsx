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
import { BrowserRouter as Router } from 'react-router-dom'
import { CustomerForm } from 'sarte/forms/CustomerForm'

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

export default class AppContainer extends React.Component<{}> {
  rootStore: RootStore = new RootStore()

  public async componentWillMount() {
    this.rootStore = new RootStore()
    this.rootStore.boot()
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
      createCustomer,
      createVisit,
    } = this
    return {
      createCustomer,
      createVisit,
    }
  }

  private createCustomer = async(customerForm: CustomerForm) => {
    await CustomerApi.create({
      ...customerForm.toCreateCustomerParams(),
      createdAt: Date.now(),
    })
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
    history.back()
  }
}
