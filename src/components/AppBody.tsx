import * as React from 'react'
import FloatingActionButton from 'sarte/components/material-ui/Button/FloatingActionButton'
import { withStyles } from 'material-ui/styles'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Customers from 'sarte/components/pages/Customers/Customers'
import NewCustomer from 'sarte/components/pages/Customers/NewCustomer'
import NotFound from 'sarte/components/pages/NotFound'

interface AppBodyProps {}

const notify = () => alert('hello')

const AppBody = ({ classes }) => {
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

const styles = {
  root: {
    marginTop: 24,
    backgroundColor: '#fff',
    padding: 12,
  },
}

export default withStyles(styles)<AppBodyProps>(AppBody)
