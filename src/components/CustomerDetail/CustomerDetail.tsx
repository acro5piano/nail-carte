import * as React from 'react'
import UiStore from 'sarte/stores/UiStore'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'
import { Link, withRouter, match } from 'react-router-dom'
import { CUSTOMER_LIST_PATH, EDIT_CUSTOMER_PATH, EDIT_VISIT_PATH, getLink } from 'sarte/Routes'
import AppHeader from 'sarte/components/AppHeader'
import CustomerStore from 'sarte/stores/CustomerStore'
import FloatingActionButton from 'sarte/components/MaterialUi/Button/FloatingActionButton'
import VisitListItem from 'sarte/components/CustomerDetail/VisitListItem'
import Basic from 'sarte/components/CustomerDetail/Basic'
import Contact from 'sarte/components/CustomerDetail/Contact'
import Visit from 'sarte/entities/Visit'
import VisitDetail, { HeaderComponent } from 'sarte/components/VisitDetailModal'
import { History } from 'sarte/types'
import Modal from 'sarte/components/Modal'
import FlatCard from 'sarte/components/utils/FlatCard'
import FlatTitle from 'sarte/components/utils/FlatTitle'

interface Props {
  customerStore: CustomerStore
  uiStore: UiStore
  history: History
  match: match
}

export class Customer extends React.Component<Props> {
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.customerStore.setCurrentCustomerId(id)
  }

  toSelectedCustomerEditPath = () => {
    const { customerStore, history } = this.props
    const path = getLink(EDIT_CUSTOMER_PATH, customerStore.currentCustomerId)
    history.push(path)
  }

  onUploadAvatarImage = (event: any) => {
    const { customerStore, match } = this.props
    customerStore.uploadAvatar(match.params.id, event.target.files[0])
  }

  selectVisit = (visit: Visit) => this.props.customerStore.setCurrentVisitId(visit.id)

  deselectVisit = () => this.props.customerStore.setCurrentVisitId()

  toEditVisitPath = () => {
    const { selectedVisit } = this.props.customerStore
    if (!selectedVisit) {
      return
    }
    this.props.history.push(
      getLink(EDIT_VISIT_PATH, this.props.match.params.id, selectedVisit.id, 'date'),
    )
  }

  deleteVisit = async () => {
    if (!window.confirm('削除して良いですか?')) {
      return
    }
    await this.props.customerStore.deleteCurrentVisit()
    this.props.uiStore.showMessage('来店を削除しました。')
  }

  render() {
    const { customerStore } = this.props
    const customer = customerStore.selectedCustomer

    if (!customer) {
      return null
    }

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
          {customer.visits.map(visit => (
            <VisitListItem key={visit.id} visit={visit} onClick={this.selectVisit} />
          ))}
        </FlatCard>
        <Link to={getLink(EDIT_VISIT_PATH, customer.id, 'new', 'date')}>
          <FloatingActionButton />
        </Link>

        {customerStore.selectedVisit && (
          <Modal
            title={customerStore.selectedVisit.startAtForHuman}
            open={Boolean(customerStore.selectedVisit)}
            headerComponent={
              <HeaderComponent
                title={customerStore.selectedVisit.startAtForHuman}
                onClose={this.deselectVisit}
                onDelete={this.deleteVisit}
                onEdit={this.toEditVisitPath}
              />
            }
            rightLabel="編集"
          >
            <VisitDetail visit={customerStore.selectedVisit} />
          </Modal>
        )}
      </div>
    )
  }
}

export default compose(
  withRouter,
  inject('customerStore', 'uiStore'),
  observer,
)<Props>(Customer)
