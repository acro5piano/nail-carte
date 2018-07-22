import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider'
import FloatingActionButton from 'sarte/components/MaterialUi/Button/FloatingActionButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import Avatar from '@material-ui/core/Avatar'
import ImageIcon from '@material-ui/icons/Image'
import { CREATE_CUSTOMER_PATH, getLink } from 'sarte/Routes'
import AppHeader from 'sarte/components/AppHeader'
import { compose } from 'recompose'
import CustomerStore from 'sarte/stores/CustomerStore'
import Customer from 'sarte/entities/Customer'

const SearchContainer = styled.div`
  padding: 0 12px;
`

const StyledList = styled(List as React.SFC)`
  && {
    margin-top: 24px;
    background-color: #fff;
    padding: 12px;
  }
`

interface CustomersProps {
  classes: any
  customerStore: CustomerStore
}

interface CustomersState {
  searchInput: string
}

class CustomerList extends React.Component<CustomersProps, CustomersState> {
  state = {
    searchInput: '',
  }

  onChangeSearchInput = (event: any) => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  get filteredCustomers(): Customer[] {
    const { searchInput } = this.state
    if (!searchInput) {
      return this.props.customerStore.sortedCustomers
    }
    return this.props.customerStore.sortedCustomers.filter(customer => {
      return customer.search(searchInput)
    })
  }

  render() {
    // const { customerStore } = this.props
    const { searchInput } = this.state

    return (
      <div>
        <AppHeader noMenu title="顧客一覧" />

        <SearchContainer>
          <TextField value={searchInput} fullWidth label="検索" onChange={this.onChangeSearchInput} />
        </SearchContainer>

        <StyledList>
          {this.filteredCustomers.map(customer => (
            <div key={customer.id}>
              <Link to={getLink('/customers/:id', customer.id)}>
                <ListItem>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                  <ListItemText primary={customer.name} secondary={customer.lastVisitAt} />
                </ListItem>
                <li>
                  <Divider inset />
                </li>
              </Link>
            </div>
          ))}
        </StyledList>
        <Link to={CREATE_CUSTOMER_PATH}>
          <FloatingActionButton Icon={PersonAddIcon} />
        </Link>
      </div>
    )
  }
}

export default compose(
  inject('customerStore'),
  observer,
)(CustomerList)
