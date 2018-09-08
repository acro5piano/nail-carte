import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import CustomerList from 'sarte/components/Customer/CustomerList'
import CreateCustomer from 'sarte/components/Customer/CreateCustomer'
import Customer from 'sarte/components/Customer/Customer'
import CreateVisit from 'sarte/components/CreateVisit/CreateVisit'
import Login from 'sarte/components/Auth/Login'
import Register from 'sarte/components/Auth/Register'
import InputTeam from 'sarte/components/Auth/InputTeam'

// import NotFound from 'sarte/components/NotFound'

export const HOME_PATH = '/'
export const LOGIN_PATH = '/login'
export const REGISTER_PATH = '/register'
export const INPUT_TEAM_PATH = '/tutorial/team'

export const CUSTOMER_LIST_PATH = '/customers'
export const CUSTOMER_PATH = '/customers/:id'
export const CREATE_CUSTOMER_PATH = '/customers/new/edit'
export const VISIT_PATH = '/visits/:id'
export const EDIT_CUSTOMER_PATH = '/customers/:id/edit'

export const CREATE_VISIT_PATH = '/customers/:id/visits/new/:step'
export const EDIT_VISIT_PATH = '/customers/:id/visits/:visitId/:step'

// Get full path to a resource.
//     e.g.) getLink(1, CREATE_VISIT_PATH) => /customers/1/visits/new
export const getLink = (pathname: string, ...ids: any[]): string =>
  ids.reduce((cur, id) => cur.replace(/:[a-z|A-Z]+/, id), pathname)

const Routes = props => (
  <div className="appBody">
    <Switch>
      <Route exact path={CREATE_VISIT_PATH} component={CreateVisit} />
      <Route exact path={EDIT_VISIT_PATH} component={CreateVisit} />

      <Route exact path={EDIT_CUSTOMER_PATH} component={CreateCustomer} />
      <Route exact path={CUSTOMER_PATH} component={Customer} />
      <Route exact path={CUSTOMER_LIST_PATH} component={CustomerList} />

      <Route exact path={LOGIN_PATH} component={Login} />
      <Route exact path={REGISTER_PATH} component={Register} />
      <Route exact path={INPUT_TEAM_PATH} component={InputTeam} />
      <Route exact path={HOME_PATH} component={CustomerList} />
    </Switch>
  </div>
)

export default Routes
