import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import Divider from '@material-ui/core/Divider'
import FloatingActionButton from 'sarte/components/MaterialUi/Button/FloatingActionButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import ImageIcon from '@material-ui/icons/Image'
import { CREATE_CUSTOMER_PATH, getLink } from 'sarte/Routes'
import AppHeader from 'sarte/components/AppHeader'
import { compose } from 'recompose'
import CustomerStore from 'sarte/stores/CustomerStore'

interface CustomersProps {
  classes: any
  customerStore: CustomerStore
}

const CustomerList = ({ classes, customerStore }: CustomersProps) => (
  <div className={classes.root}>
    <AppHeader noMenu title="Customers" />
    <List>
      {customerStore.sortedCustomers.map(customer =>
        <div key={customer.id}>
          <Link to={getLink('/customers/:id', customer.id)}>
            <ListItem>
              <Avatar><ImageIcon /></Avatar>
              <ListItemText primary={customer.name} secondary={customer.lastVisitAt} />
            </ListItem>
            <li><Divider inset /></li>
          </Link>
        </div>,
      )}
    </List>
    <Link to={CREATE_CUSTOMER_PATH}>
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

export default compose(
  withStyles(styles),
  inject('customerStore'),
  observer,
)(CustomerList)
