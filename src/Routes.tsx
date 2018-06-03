import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import CustomerList from 'sarte/components/Customer/CustomerList'
import NewCustomer from 'sarte/components/Customer/CreateCustomer'
import Customer from 'sarte/components/Customer/Customer'
import NotFound from 'sarte/components/NotFound'

export const HOME_PATH = '/'
export const CUSTOMER_LIST_PATH = '/customers'
export const CUSTOMER_PATH = '/customers/:id'
export const NEW_CUSTOMER_PATH = '/customers/new'

const Routes = (props) => {
  const renderWithProps = (ComposedComponent) => (routerProps) => <ComposedComponent {...props} {...routerProps} />

  const RouteWithProps = ({ path, component, name = '' }) =>
     <Route exact name={name} path={path} render={renderWithProps(component)}/>

  return (
    <div className="appBody">
      <Switch>
        <RouteWithProps path={NEW_CUSTOMER_PATH} component={NewCustomer}/>
        <RouteWithProps name={'customer'} path={CUSTOMER_PATH} component={Customer}/>
        <RouteWithProps path={CUSTOMER_LIST_PATH} component={CustomerList}/>

        <RouteWithProps path={HOME_PATH} component={NotFound}/>
      </Switch>
    </div>
  )
}

export default Routes
