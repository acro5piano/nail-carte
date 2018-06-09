import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import { compose } from 'recompose'
import { withStyles, WithStyles } from '@material-ui/core/styles'
import Customer from 'sarte/entities/Customer'

interface ContactProps {
  customer: Customer
}

const Contact = ({ classes, customer }: ContactProps & WithStyles) => (
  <div className={classes.basic}>
    <Grid container spacing={16}>
      <Grid item xs={3}>
        <div className={classes.photo}>Email</div>
        <div className={classes.photo}>Phone</div>
      </Grid>
      <Grid item xs={9}>
        <div>{customer.email}</div>
        <div>{customer.phoneNumber}</div>
      </Grid>
    </Grid>
  </div>
)

const styles = {
  photo: {
    display: 'flex',
    justifyContent: 'flex-start',
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
}

export default compose(
  withStyles(styles),
)<ContactProps>(Contact)
