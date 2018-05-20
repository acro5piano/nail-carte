import * as React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import CustomerList from 'sarte/components/Customer/CustomerList'
import NewCustomer from 'sarte/components/Customer/CreateCustomer'
import NotFound from 'sarte/components/NotFound'

export const HOME_PATH = '/'
export const CUSTOMER_LIST_PATH = '/customers'
export const CUSTOMER_PATH = '/customers/:id'
export const NEW_CUSTOMER_PATH = '/customers/new'

const Routes = (props) => {
  const RouteWithProps = ({ path, render }) =>
    <Route {...props} exact path={HOME_PATH} render={render}/>

  return (
    <div className="appBody">
      <Router>
        <div>
          <Switch>
            <Route exact path={CUSTOMER_LIST_PATH} component={CustomerList}/>
            <Route exact path={NEW_CUSTOMER_PATH} component={NewCustomer}/>
            <RouteWithProps path={HOME_PATH} render={NotFound}/>
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default Routes
