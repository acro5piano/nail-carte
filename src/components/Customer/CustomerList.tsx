import * as React from 'react'
import { withStyles } from 'material-ui/styles'
import Divider from 'material-ui/Divider'
import FloatingActionButton from 'sarte/components/MaterialUi/Button/FloatingActionButton'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import ImageIcon from '@material-ui/icons/Image'
import { NEW_CUSTOMER_PATH } from 'sarte/Routes'
// import AppHeader from 'sarte/components/AppHeader'

interface CustomersProps {}

const toNewCustomer = () => location.href = '/#/' + NEW_CUSTOMER_PATH

// import Customer from '../entities/Customer'
// const c = new Customer({name: 'KAZUYA'})

const CustomerList = ({ classes }) => (
  <div className={classes.root}>
    <FloatingActionButton onClick={toNewCustomer} />
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

export default withStyles(styles)<CustomersProps>(CustomerList)
