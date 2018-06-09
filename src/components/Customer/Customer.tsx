import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { CREATE_VISIT_PATH, getLink } from 'sarte/Routes'
import AppHeader from 'sarte/components/AppHeader'
// import Grid from '@material-ui/core/Grid'
import CustomerStore from 'sarte/stores/CustomerStore'
import FloatingActionButton from 'sarte/components/MaterialUi/Button/FloatingActionButton'
import Visit from './Detail/Visit'
import Basic from './Detail/Basic'
import Contact from './Detail/Contact'

interface CustomerProps {
  classes: any
  match: any
  customerStore: CustomerStore
}

const Customer = ({ classes, customerStore, match }: CustomerProps) => {
  const customer = customerStore.selectedCustomer
  if (!customer) {
    return null
  }

  return (
    <div className={classes.root}>
      <AppHeader hasBack title={customer.name} />
      <div className={classes.basic}>
        <Basic customer={customer} />
      </div>
      <h2 className={classes.title}>Contact</h2>
      <div className={classes.basic}>
        <Contact customer={customer} />
      </div>
      <h2 className={classes.title}>History</h2>
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
  withStyles(styles),
  inject('customerStore'),
  observer,
)<CustomerProps>(Customer)
