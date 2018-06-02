import * as React from 'react'
import { withStyles } from 'material-ui/styles'
import { Link } from 'react-router-dom'
import Divider from 'material-ui/Divider'
import FloatingActionButton from 'sarte/components/MaterialUi/Button/FloatingActionButton'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import ImageIcon from '@material-ui/icons/Image'
import { NEW_CUSTOMER_PATH } from 'sarte/Routes'
import AppHeader from 'sarte/components/AppHeader'
import { orderBy } from 'lodash'

interface CustomersProps {}

const CustomerList = ({ classes, customers, toggleSidebar }) => (
  <div className={classes.root}>
    <AppHeader onClickMenu={toggleSidebar} title="Customers" />
    <List>
      {orderBy(customers, 'createdAt').reverse().map(customer =>
        <div key={customer.id}>
          <ListItem>
            <Avatar><ImageIcon /></Avatar>
            <ListItemText primary={customer.name} secondary={customer.birthday} />
          </ListItem>
          <li><Divider inset /></li>
        </div>,
      )}
    </List>
    <Link to={NEW_CUSTOMER_PATH}>
      <FloatingActionButton />
    </Link>
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
