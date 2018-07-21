import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import CustomerList from 'sarte/components/Customer/CustomerList'
import CreateCustomer from 'sarte/components/Customer/CreateCustomer'
import Customer from 'sarte/components/Customer/Customer'
import CreateVisit from 'sarte/components/CreateVisit/CreateVisit'
import Login from 'sarte/components/Login'

// import NotFound from 'sarte/components/NotFound'

export const HOME_PATH = '/'
export const LOGIN_PATH = '/login'
export const CUSTOMER_LIST_PATH = '/customers'
export const CUSTOMER_PATH = '/customers/:id'
export const CREATE_CUSTOMER_PATH = '/customers/new'
export const EDIT_CUSTOMER_PATH = '/customers/:id/edit'

export const CREATE_VISIT_PATH = '/customers/:id/visits/new/:step'

// Get full path to a resource.
//     e.g.) getLink(1, CREATE_VISIT_PATH) => /customers/1/visits/new
export const getLink = (pathname: string, ...ids: any[]): string =>
  ids.reduce((cur, id) => cur.replace(/:[a-z|A-Z]+/, id), pathname)

const Routes = props => (
  <div className="appBody">
    <Switch>
      <Route path={CREATE_VISIT_PATH} component={CreateVisit} />

      <Route path={CREATE_CUSTOMER_PATH} component={CreateCustomer} />
      <Route path={EDIT_CUSTOMER_PATH} component={CreateCustomer} />
      <Route path={CUSTOMER_PATH} component={Customer} />
      <Route path={CUSTOMER_LIST_PATH} component={CustomerList} />

      <Route path={LOGIN_PATH} component={Login} />
      <Route path={HOME_PATH} component={CustomerList} />
    </Switch>
  </div>
)

export default Routes
