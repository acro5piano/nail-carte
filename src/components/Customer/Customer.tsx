import * as React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import FloatingActionButton from 'sarte/components/MaterialUi/Button/FloatingActionButton'
import Avatar from '@material-ui/core/Avatar'
import ImageIcon from '@material-ui/icons/Image'
import { NEW_CUSTOMER_PATH } from 'sarte/Routes'
import AppHeader from 'sarte/components/AppHeader'
import Grid from '@material-ui/core/Grid'

interface CustomersProps {}

const Customer = ({ classes, customers, toggleSidebar, match }) => {
  const customer = customers.find(c => c.id === Number(match.params.id))
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
      <Link to={NEW_CUSTOMER_PATH}>
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

export default withStyles(styles)<CustomersProps>(Customer)
