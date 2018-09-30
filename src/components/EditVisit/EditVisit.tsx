import * as React from 'react'
import { inject, observer } from 'mobx-react'
// import styled from 'styled-components'
import { compose } from 'recompose'
import { Route, withRouter } from 'react-router-dom'
import { getLink, CUSTOMER_PATH /* CREATE_VISIT_PATH */ } from 'sarte/Routes'
import CustomerStore from 'sarte/stores/CustomerStore'
import AppHeader from 'sarte/components/AppHeader'
import { VisitForm } from 'sarte/forms/VisitForm'
import VisitPhoto from 'sarte/entities/VisitPhoto'
// import { validate } from 'sarte/utils'
import TakePhoto from 'sarte/components/EditVisit/TakePhoto'
import DateInput from 'sarte/components/EditVisit/DateInput'
import Price from 'sarte/components/EditVisit/Price'
import Note from 'sarte/components/EditVisit/Note'
import Menu from 'sarte/components/EditVisit/Menu'
import Components from 'sarte/components/EditVisit/Components/Components'
import _ from 'lodash'

const steps = ['date', 'photo', 'menu', 'components', 'price', 'note']

interface NewVisitProps {
  classes: any
  match: any
  history: any
  customerStore: CustomerStore
}

interface NewVisitState {
  visitForm: VisitForm
  visitPhotos: VisitPhoto[]
  loading: boolean
}

class EditVisit extends React.Component<NewVisitProps, NewVisitState> {
  public state = {
    visitForm: new VisitForm({}),
    visitPhotos: [],
    loading: false,
  }

  componentDidMount() {
    const { customerId, visitId } = this.props.match.params
    if (visitId !== 'new') {
      this.props.customerStore.setCurrentCustomerId(customerId)
      this.setState({
        visitForm: VisitForm.fromEntitiy(
          this.props.customerStore.findCurrentCustomerVisitByVisitId(visitId),
        ),
      })
    }
  }

  onChange = (visitForm: VisitForm) => this.setState({ visitForm })

  private next = () => {
    const { history, match } = this.props
    const { customerId, visitId, step } = match.params

    if (step === _.last(steps)) {
      return this.submit()
    }

    const nextStep = steps[steps.indexOf(step) + 1]
    history.push(
      getLink('/customers/:customerId/visits/:visitId/edit/:step', customerId, visitId, nextStep),
    )
  }

  private onAddPhoto = async event => {
    this.setState({ loading: true })
    const visitPhotos = await Promise.all(
      Array.from(event.target.files).map(async file => {
        await this.props.customerStore.uploadPhoto(file)
        const visitPhoto = await this.props.customerStore.uploadPhoto(file)
        return visitPhoto
      }),
    )
    this.setState({
      visitPhotos: [...this.state.visitPhotos, ...visitPhotos],
      loading: false,
    })
  }

  private get submitTitle(): string {
    if (this.props.match.params.step === _.last(steps)) {
      return '完了'
    }
    return '次へ'
  }

  private submit = async () => {
    if (this.state.loading || !this.state.visitForm.validate()) {
      return false
    }
    const { history, match } = this.props
    await this.props.customerStore.updateOrCreateVisit(this.state)
    history.push(getLink(CUSTOMER_PATH, match.params.customerId))
  }

  render() {
    const { visitPhotos, visitForm } = this.state

    /* tslint:disable */
    return (
      <div>
        <AppHeader hasBack title="来店を追加" onSubmit={this.next} submitTitle={this.submitTitle} />
        <Route
          path="/customers/:customerId/visits/:visitId/edit/date"
          render={() => <DateInput visitForm={visitForm} onChange={this.onChange} />}
        />
        <Route
          path="/customers/:customerId/visits/:visitId/edit/photo"
          render={() => <TakePhoto visitPhotos={visitPhotos} onChange={this.onAddPhoto} />}
        />
        <Route
          path="/customers/:customerId/visits/:visitId/edit/menu"
          render={() => <Menu visitForm={visitForm} onChange={this.onChange} />}
        />
        <Route
          path="/customers/:customerId/visits/:visitId/edit/components"
          render={() => <Components visitForm={visitForm} onChange={this.onChange} />}
        />
        <Route
          path="/customers/:customerId/visits/:visitId/edit/price"
          render={() => <Price visitForm={visitForm} onChange={this.onChange} />}
        />
        <Route
          path="/customers/:customerId/visits/:visitId/edit/note"
          render={() => <Note visitForm={visitForm} onChange={this.onChange} />}
        />
      </div>
    )
    /* tslint:enable */
  }
}

export default compose(
  withRouter,
  inject('customerStore'),
  observer,
)(EditVisit)
