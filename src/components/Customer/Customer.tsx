import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'
import styled from 'styled-components'
import { Link, withRouter } from 'react-router-dom'
import { CUSTOMER_LIST_PATH, CREATE_VISIT_PATH, EDIT_CUSTOMER_PATH, getLink } from 'sarte/Routes'
import AppHeader from 'sarte/components/AppHeader'
import CustomerStore from 'sarte/stores/CustomerStore'
import FloatingActionButton from 'sarte/components/MaterialUi/Button/FloatingActionButton'
import Visit from 'sarte/components/Customer/Detail/Visit'
import Basic from 'sarte/components/Customer/Detail/Basic'
import Contact from 'sarte/components/Customer/Detail/Contact'
import { History } from 'sarte/types'

const Card = styled.div`
  padding: 12px;
  background: #fff;
`

const Title = styled.div`
  padding: 12px;
`

interface CustomerProps {
  customerStore: CustomerStore
  history: History
}

const Customer = ({ customerStore, history }: CustomerProps) => {
  const customer = customerStore.selectedCustomer
  if (!customer) {
    return null
  }

  const toSelectedCustomerEditPath = () => {
    const path = getLink(EDIT_CUSTOMER_PATH, customer.id)
    history.push(path)
  }

  return (
    <div>
      <AppHeader
        hasBack
        title={customer.name}
        backTo={CUSTOMER_LIST_PATH}
        onSubmit={toSelectedCustomerEditPath}
        submitTitle="編集"
      />
      <Card>
        <Basic customer={customer} />
      </Card>
      <Title>連絡先</Title>
      <Card>
        <Contact customer={customer} />
      </Card>
      <Title>来店履歴</Title>
      <Card>
        {customer.visits.length === 0 && <div>来店履歴なし</div>}
        {customer.visits.map(visit => <Visit key={visit.id} visit={visit} />)}
      </Card>
      <Link to={getLink(CREATE_VISIT_PATH, customer.id, 'date')}>
        <FloatingActionButton />
      </Link>
    </div>
  )
}

export default compose(
  withRouter,
  inject('customerStore'),
  observer,
)<CustomerProps>(Customer)
