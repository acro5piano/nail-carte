import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import ImageIcon from '@material-ui/icons/Image'
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter'
import PlaceIcon from '@material-ui/icons/Place'
import CakeIcon from '@material-ui/icons/Cake'
import { CREATE_VISIT_PATH, getLink } from 'sarte/Routes'
import AppHeader from 'sarte/components/AppHeader'
import Grid from '@material-ui/core/Grid'
import CustomerStore from 'sarte/stores/CustomerStore'
import FloatingActionButton from 'sarte/components/MaterialUi/Button/FloatingActionButton'
import Visit from './Detail/Visit'

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
            <div><BusinessCenterIcon className={classes.basicIcon}/>{customer.occupation}</div>
            <div><CakeIcon className={classes.basicIcon}/>{customer.birthday}</div>
            <div><PlaceIcon className={classes.basicIcon}/>{customer.address}</div>
          </Grid>
        </Grid>
      </div>
      <h2 className={classes.title}>History</h2>
      <div className={classes.basic}>
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
