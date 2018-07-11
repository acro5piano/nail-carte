import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import AppHeader from 'sarte/components/AppHeader'
import { CustomerForm } from 'sarte/forms/CustomerForm'
import TextField from '@material-ui/core/TextField'
import CustomerStore from 'sarte/stores/CustomerStore'
import { validate } from 'sarte/utils'
import { History } from 'sarte/types'

interface NewCustomerProps {
  classes: any
  customerStore: CustomerStore
  history: History
}

interface NewCustomerState {
  customerForm: CustomerForm
}

class CreateCustomer extends React.Component<NewCustomerProps, NewCustomerState> {
  public state = {
    customerForm: new CustomerForm(),
  }

  componentDidMount() {
    const { selectedCustomer } = this.props.customerStore
    if (selectedCustomer) {
      this.setState({ customerForm: selectedCustomer.toForm() })
    }
  }

  get title() {
    return this.props.customerStore.selectedCustomer ? '顧客編集' : '顧客登録'
  }

  public render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <AppHeader hasBack title={this.title} canSubmit={this.validate} onSubmit={this.submit} submitTitle="保存" />
        <div>
          <TextField
            name="name"
            type="text"
            label="名前"
            fullWidth
            value={this.state.customerForm.name}
            onChange={this.onUpdateName}
          />
        </div>
        <div className={classes.input}>
          <TextField
            name="email"
            type="email"
            label="メールアドレス"
            value={this.state.customerForm.email}
            onChange={this.onUpdateEmail}
          />
        </div>
        <div className={classes.input}>
          <TextField
            name="phoneNumber"
            type="number"
            label="電話番号"
            value={this.state.customerForm.phoneNumber}
            onChange={this.onUpdatePhoneNumber}
          />
        </div>
        <div className={classes.input}>
          <TextField
            name="address"
            type="text"
            label="住所"
            fullWidth
            value={this.state.customerForm.address}
            onChange={this.onUpdateAddress}
          />
        </div>
        <div className={classes.input}>
          <TextField
            name="occupation"
            type="text"
            label="職業"
            value={this.state.customerForm.occupation}
            onChange={this.onUpdateOccupation}
          />
        </div>
        <div className={classes.input}>
          <TextField
            name="birthday"
            type="date"
            label="誕生日"
            value={this.state.customerForm.birthdayForHuman}
            onChange={this.onUpdateBirthday}
            InputLabelProps={{ shrink: true }}
          />
        </div>
      </div>
    )
  }

  private get validate() {
    const { name, email } = this.state.customerForm
    return validate(
      {
        name,
        email,
      },
      {
        name: 'required',
        email: 'email',
      },
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
  private onUpdatePhoneNumber = event => this.handleChange('phoneNumber')(event)
  private onUpdateBirthday = event => this.handleChange('birthday')(event)
  private onUpdateOccupation = event => this.handleChange('occupation')(event)
  private onUpdateAddress = event => this.handleChange('address')(event)

  private submit = async () => {
    await this.props.customerStore.createCustomer(this.state.customerForm)
    this.props.history.goBack()
  }
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
  withRouter,
  withStyles(styles),
  inject('customerStore'),
  observer,
)(CreateCustomer)
