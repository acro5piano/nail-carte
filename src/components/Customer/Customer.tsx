import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import FloatingActionButton from 'sarte/components/MaterialUi/Button/FloatingActionButton'
import Avatar from '@material-ui/core/Avatar'
import ImageIcon from '@material-ui/icons/Image'
import { CREATE_VISIT_PATH, getLink } from 'sarte/Routes'
import AppHeader from 'sarte/components/AppHeader'
import Grid from '@material-ui/core/Grid'
import CustomerStore from 'sarte/stores/CustomerStore'

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
        <Grid container spacing={16}>
          <Grid item xs={4}>
            <div className={classes.photo}>
              <Avatar className={classes.avatar}><ImageIcon /></Avatar>
            </div>
          </Grid>
          <Grid item xs={8}>
            <div>{customer.name}</div>
            <div>{customer.birthday}</div>
          </Grid>
        </Grid>
      </div>
      <div className={classes.basic}>
        {customer.visits.map(v => v.note)}
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
  photo: {
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
  },
  basic: {
    padding: 12,
    backgroundColor: '#fff',
  },
}

export default compose(
  withStyles(styles),
  inject('customerStore'),
  observer,
)<CustomerProps>(Customer)
