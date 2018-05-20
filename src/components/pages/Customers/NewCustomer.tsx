import * as React from 'react'
import { withStyles } from 'material-ui/styles'
// import AppHeader from 'sarte/components/AppHeader'
// import Customer from '../entities/Customer'
import { Field, reduxForm } from 'redux-form'

interface CustomersProps {}

const NewCustomerForm = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <label htmlFor="firstName">First Name</label>
    <Field name="firstName" component="input" type="text" />
    <button type="submit">Submit</button>
  </form>
)

const createReduxForm = reduxForm({ form: 'NewCustomer' })

const NewCustomerReduxForm = createReduxForm(NewCustomerForm)

const handle = values => {
  console.log(values)
}

const NewCustomer = ({ classes }) => (
  <div className={classes.root}>
    <NewCustomerReduxForm onSubmit={handle} />
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
