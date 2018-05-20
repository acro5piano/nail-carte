import * as React from 'react'
import { withStyles } from 'material-ui/styles'
// import AppHeader from 'sarte/components/AppHeader'
// import Customer from '../entities/Customer'

interface CustomersProps {}

const handle = values => {
  console.log(values)
}

const NewCustomer = ({ classes }) => (
  <div className={classes.root}>
    <form onSubmit={handle}>
      <label htmlFor="firstName">First Name</label>
      <input name="firstName" type="text" />
      <button type="submit">Submit</button>
    </form>
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
