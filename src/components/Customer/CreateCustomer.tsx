import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import AppHeader from 'sarte/components/AppHeader'
import { CustomerForm } from 'sarte/forms/CustomerForm'
import TextField from '@material-ui/core/TextField'
import CustomerStore from 'sarte/stores/CustomerStore'

interface NewCustomerProps {
  classes: any
  customerStore: CustomerStore
}

interface NewCustomerState {
  customerForm: CustomerForm
}

class CreateCustomer extends React.Component<NewCustomerProps, NewCustomerState> {
  public state = {
    customerForm: new CustomerForm(),
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
            defaultValue={this.state.customerForm.name}
            onChange={this.onUpdateName}
          />
        </div>
        <div className={classes.input}>
          <TextField
            name="email"
            type="email"
            label="Email"
            defaultValue={this.state.customerForm.createdAt}
            onChange={this.onUpdateEmail}
          />
        </div>
        <div className={classes.input}>
          <TextField
            name="occupation"
            type="occupation"
            label="Occupation"
            defaultValue={this.state.customerForm.occupation}
            onChange={this.onUpdateEmail}
          />
        </div>
        <div className={classes.input}>
          <TextField
            name="birthday"
            type="date"
            label="Birthday"
            defaultValue={this.state.customerForm.birthdayForHuman}
            onChange={this.onUpdateBirthday}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      </div>
    )
  }

  private handleChange = field => event => {
    const customerForm = new CustomerForm({
      ...this.state.customerForm,
      [field]: event.target.value,
    })
    this.setState({ customerForm })
  }

  private onUpdateName = event => this.handleChange('name')(event)

  private onUpdateEmail = event => this.handleChange('email')(event)

  private onUpdateBirthday = event => this.handleChange('birthday')(event)

  private submit = () => this.props.customerStore.createCustomer(this.state.customerForm)
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

export default compose(
  withStyles(styles),
  inject('customerStore'),
  observer,
)(CreateCustomer)
