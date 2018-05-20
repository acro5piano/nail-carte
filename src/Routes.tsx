import * as React from 'react'
import FloatingActionButton from 'sarte/components/material-ui/Button/FloatingActionButton'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Customers from 'sarte/components/customer/CustomerList'
import NewCustomer from 'sarte/components/customer/CreateCustomer'
import NotFound from 'sarte/components/NotFound'

const notify = () => alert('hello')

const Routes = () => {
  return (
    <div className="appBody">
      <FloatingActionButton onClick={notify} />
      <Router>
        <div>
          <Route exact path="/" component={NotFound}/>
          <Route exact path="/customers" component={Customers}/>
          <Route exact path="/customers/new" component={NewCustomer}/>
        </div>
      </Router>
    </div>
  )
}

export default Routes
