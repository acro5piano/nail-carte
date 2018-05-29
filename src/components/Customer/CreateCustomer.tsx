import * as React from 'react'
import { withStyles } from 'material-ui/styles'
// import AppHeader from 'sarte/components/AppHeader'
// import Customer from '../entities/Customer'

interface CustomersProps {}

const NewCustomer = ({ classes, createCustomer }) => (
  <div className={classes.root}>
    <label htmlFor="firstName">First Name</label>
    <input name="firstName" type="text" />
    <button onClick={createCustomer}>Submit</button>
  </div>
)

const styles = {
  root: {
    marginTop: 24,
    backgroundColor: '#fff',
    padding: 12,
  },
}

export default withStyles(styles)<CustomersProps>(NewCustomer)
