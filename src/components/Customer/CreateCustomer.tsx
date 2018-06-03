import * as React from 'react'
import { withStyles } from '@material-ui/core/styles'
import AppHeader from 'sarte/components/AppHeader'
import { CustomerForm } from 'sarte/forms/CustomerForm'
import TextField from '@material-ui/core/TextField'

interface CustomersProps {}

interface NewCustomerProps {
  classes: any
  history: any
  createCustomer: (customer: CustomerForm) => void
}

interface NewCustomerState {
  newCustomer: CustomerForm
}

class NewCustomer extends React.PureComponent<NewCustomerProps, NewCustomerState> {
  public state = {
    newCustomer: new CustomerForm(),
  }

  public render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <AppHeader hasBack onSubmit={this.submit} submitTitle="Create" />
        <div>
          <TextField
            name="name"
            type="text"
            label="Name"
            fullWidth
            defaultValue={this.state.newCustomer.name}
            onChange={this.onUpdateName}
          />
        </div>
        <div className={classes.input}>
          <TextField
            name="birthday"
            type="date"
            label="Birthday"
            defaultValue={this.state.newCustomer.name}
            onChange={this.onUpdateName}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      </div>
    )
  }

  private handleChange = field => event => {
    const newCustomer = new CustomerForm({
      ...this.state.newCustomer,
      [field]: event.target.value,
    })
    this.setState({ newCustomer })
  }

  private onUpdateName = event => {
    this.handleChange('name')(event)
  }

  private submit = () => this.props.createCustomer(this.state.newCustomer)
}

const styles = {
  root: {
    marginTop: 24,
    backgroundColor: '#fff',
    padding: 12,
  },
  input: {
    marginTop: 36,
  },
}

export default withStyles(styles)<CustomersProps>(NewCustomer)
