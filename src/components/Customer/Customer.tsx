import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'
import { Link, withRouter, match } from 'react-router-dom'
import { CUSTOMER_LIST_PATH, CREATE_VISIT_PATH, EDIT_CUSTOMER_PATH, getLink } from 'sarte/Routes'
import AppHeader from 'sarte/components/AppHeader'
import CustomerStore from 'sarte/stores/CustomerStore'
import FloatingActionButton from 'sarte/components/MaterialUi/Button/FloatingActionButton'
import VisitListItem from 'sarte/components/Customer/Detail/VisitListItem'
import Basic from 'sarte/components/Customer/Detail/Basic'
import Contact from 'sarte/components/Customer/Detail/Contact'
import Visit from 'sarte/entities/Visit'
import VisitDetail from 'sarte/components/Customer/VisitDetail/VisitDetail'
import { History } from 'sarte/types'
import Modal from 'sarte/components/Modal'
import FlatCard from 'sarte/components/utils/FlatCard'
import FlatTitle from 'sarte/components/utils/FlatTitle'

interface Props {
  customerStore: CustomerStore
  history: History
  match: match
}

interface State {
  selectedVisit: Visit | null
}

export class Customer extends React.Component<Props, State> {
  state = {
    selectedVisit: null,
  }

  toSelectedCustomerEditPath = () => {
    const { customerStore, history, match } = this.props
    const customer = customerStore.findCustomerByIdOrFail(match.params.id)
    if (!customer) {
      return
    }
    const path = getLink(EDIT_CUSTOMER_PATH, customer.id)
    history.push(path)
  }

  onUploadAvatarImage = (event: any) => {
    const { customerStore, match } = this.props
    customerStore.uploadAvatar(match.params.id, event.target.files[0])
  }

  selectVisit = (selectedVisit: Visit) => this.setState({ selectedVisit })

  deselectVisit = () => this.setState({ selectedVisit: null })

  render() {
    const { customerStore, match } = this.props
    const { selectedVisit } = this.state
    const customer = customerStore.findCustomerByIdOrFail(match.params.id)

    return (
      <div>
        <AppHeader
          hasBack
          title={customer.name}
          backTo={CUSTOMER_LIST_PATH}
          onSubmit={this.toSelectedCustomerEditPath}
          submitTitle="編集"
        />
        <FlatCard>
          <Basic customer={customer} onSelectAvatar={this.onUploadAvatarImage} />
        </FlatCard>
        <FlatTitle>連絡先</FlatTitle>
        <FlatCard>
          <Contact customer={customer} />
        </FlatCard>
        <FlatTitle>来店履歴</FlatTitle>
        <FlatCard>
          {customer.visits.length === 0 && <div>来店履歴なし</div>}
          {customer.visits.map(visit => <VisitListItem key={visit.id} visit={visit} onClick={this.selectVisit} />)}
        </FlatCard>
        <Link to={getLink(CREATE_VISIT_PATH, customer.id, 'date')}>
          <FloatingActionButton />
        </Link>

        <Modal
          title={selectedVisit ? (selectedVisit as Visit).startAtForHuman : ''}
          open={Boolean(selectedVisit)}
          onClose={this.deselectVisit}
        >
          <VisitDetail visit={selectedVisit} />
        </Modal>
      </div>
    )
  }
}

export default compose(
  withRouter,
  inject('customerStore'),
  observer,
)<Props>(Customer)
