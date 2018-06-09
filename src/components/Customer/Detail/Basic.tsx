import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import ImageIcon from '@material-ui/icons/Image'
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter'
import PlaceIcon from '@material-ui/icons/Place'
import CakeIcon from '@material-ui/icons/Cake'
import Customer from 'sarte/entities/Customer'

interface VisitProps {
  classes: any
  match: any
  customer: Customer
}

const VisitComponent = ({ classes, customer }: VisitProps) => (
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
)

const styles = {
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
}

export default compose(
  withStyles(styles),
)<VisitProps>(VisitComponent)
