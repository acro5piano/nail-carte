import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import { Link, withRouter } from 'react-router-dom'
import { CREATE_VISIT_PATH, EDIT_CUSTOMER_PATH, getLink } from 'sarte/Routes'
import AppHeader from 'sarte/components/AppHeader'
// import Grid from '@material-ui/core/Grid'
import CustomerStore from 'sarte/stores/CustomerStore'
import FloatingActionButton from 'sarte/components/MaterialUi/Button/FloatingActionButton'
import Visit from './Detail/Visit'
import Basic from './Detail/Basic'
import Contact from './Detail/Contact'
import { History } from 'sarte/types'

interface CustomerProps {
  classes: any
  customerStore: CustomerStore
  history: History
}

const Customer = ({ classes, customerStore, history }: CustomerProps) => {
  const customer = customerStore.selectedCustomer
  if (!customer) {
    return null
  }

  const toSelectedCustomerEditPath = () => {
    const path = getLink(EDIT_CUSTOMER_PATH, customer.id)
    history.push(path)
  }

  return (
    <div className={classes.root}>
      <AppHeader hasBack title={customer.name} onSubmit={toSelectedCustomerEditPath} submitTitle="編集" />
      <div className={classes.basic}>
        <Basic customer={customer} />
      </div>
      <h2 className={classes.title}>連絡先</h2>
      <div className={classes.basic}>
        <Contact customer={customer} />
      </div>
      <h2 className={classes.title}>来店履歴</h2>
      <div className={classes.basic}>
        {customer.visits.length === 0 && <div>来店履歴なし</div>}
        {customer.visits.map(visit => <Visit key={visit.id} visit={visit} />)}
      </div>
      <Link to={getLink(CREATE_VISIT_PATH, customer.id)}>
        <FloatingActionButton />
      </Link>
    </div>
  )
}

const styles = {
  root: {
    // backgroundColor: '#fff',
  },
  basic: {
    padding: 12,
    backgroundColor: '#fff',
  },
  basicIcon: {
    fontSize: 12,
    marginRight: 8,
  },
  title: {
    padding: 12,
  },
}

export default compose(
  withRouter,
  withStyles(styles),
  inject('customerStore'),
  observer,
)<CustomerProps>(Customer)
