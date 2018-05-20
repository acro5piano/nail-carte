import * as React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import FloatingActionButton from 'sarte/components/MaterialUi/Button/FloatingActionButton'
import Customers from 'sarte/components/Customer/CustomerList'
import NewCustomer from 'sarte/components/Customer/CreateCustomer'
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
