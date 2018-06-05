import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import CustomerList from 'sarte/components/Customer/CustomerList'
import CreateCustomer from 'sarte/components/Customer/CreateCustomer'
import Customer from 'sarte/components/Customer/Customer'
import CreateVisit from 'sarte/components/Visit/CreateVisit'

import NotFound from 'sarte/components/NotFound'

export const HOME_PATH = '/'
export const CUSTOMER_LIST_PATH = '/customers'
export const CUSTOMER_PATH = '/customers/:id'
export const CREATE_CUSTOMER_PATH = '/customers/new'

export const CREATE_VISIT_PATH = '/customers/:id/visits/new'

export const getLink = (pathname, id) => pathname.replace(/:.+?\//, id + '/').replace(/:.+$/, id)

const Routes = (props) => (
  <div className="appBody">
    <Switch>
      <Route path={CREATE_VISIT_PATH} component={CreateVisit}/>

      <Route path={CREATE_CUSTOMER_PATH} component={CreateCustomer}/>
      <Route path={CUSTOMER_PATH} component={Customer}/>
      <Route path={CUSTOMER_LIST_PATH} component={CustomerList}/>

      <Route path={HOME_PATH} component={NotFound}/>
    </Switch>
  </div>
)

export default Routes
