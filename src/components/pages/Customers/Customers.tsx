import * as React from 'react'
import { withStyles } from 'material-ui/styles'
import Divider from 'material-ui/Divider'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import ImageIcon from '@material-ui/icons/Image'

interface CustomersProps {}

// import Customer from '../entities/Customer'
// const c = new Customer({name: 'KAZUYA'})

const Customers = ({ classes }) => (
  <div className={classes.root}>
    <List>
      <ListItem>
        <Avatar><ImageIcon /></Avatar>
        <ListItemText primary="Photos" secondary="Jan 9, 2014" />
      </ListItem>
      <li><Divider inset /></li>
      <ListItem>
        <Avatar><ImageIcon /></Avatar>
        <ListItemText primary="Photos" secondary="Jan 9, 2014" />
      </ListItem>
      <li><Divider inset /></li>
      <ListItem>
        <Avatar><ImageIcon /></Avatar>
        <ListItemText primary="Photos" secondary="Jan 9, 2014" />
      </ListItem>
      <li><Divider inset /></li>
    </List>
  </div>
)

const styles = {
  root: {
    marginTop: 24,
    backgroundColor: '#fff',
    padding: 12,
  },
}

export default withStyles(styles)<CustomersProps>(Customers)
